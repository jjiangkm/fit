import fs from 'fs'

const mkResolve = (config)=> {
    const categorys = config.categorys
    let resolvePath = ''

    for (let categoryKey in categorys) {
        // pc tb 等等模块名
        resolvePath += `
        // ${categoryKey}
        `
        let categoryInfo = categorys[categoryKey]
        let componentsInfo = categorys[categoryKey].components || []
        Object.keys(componentsInfo).map((item)=> {
            for (let component of categorys[categoryKey]['components'][item]) {
                switch (categoryKey) {
                case 'mobile':
                    resolvePath += `
                    '${categoryInfo.prefix}-${component.path}': path.join(__dirname, 'lib/${categoryKey}/${component.path}/web/src'),
                `
                    break
                default:
                    resolvePath += `
                    '${categoryInfo.prefix}-${component.path}': path.join(__dirname, 'lib/${categoryKey}/${component.path}/src'),
                `
                }
            }
        })
    }

    // 附加模块
    resolvePath += `
    // custom
    `
    config.resolve.map((item)=> {
        resolvePath += `
        '${item.prefix}-${item.path}': path.join(__dirname, 'lib/${item.dir}/${item.path}/src'),
                `
    })

    let text = `
    var path = require('path')

    module.exports = {
        alias: {
            ${resolvePath}
        },
        extensions: ['', '.js', '.jsx', '.tsx', '.ts', 'coffee', '.cjsx', '.es6']
    }
    `

    fs.writeFile('resolve.js', text, (err)=> {
        if (!err)return
        console.log(`mk resolve.js fail: ${err}`)
    })
}

export default mkResolve