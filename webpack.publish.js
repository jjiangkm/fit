var webpack = require('webpack')
var path = require('path')
var resolve = require('./resolve.js')
var _ = require('lodash')

var treeName = process.argv.slice(2)[0]

webpack({
    entry: [
        './lib/' + treeName + '/src' + '/index.js'
    ],

    output: {
        path: path.join(__dirname, 'lib/' + treeName + '/dist'),
        filename: 'index.js',
        library: treeName + '/src',
        libraryTarget: 'umd'
    },

    externals: Object.assign({
        'react': true,
        'jquery': true,
        'classnames': true,
        'lodash': true,
        'bootstrap/dist/css/bootstrap.css': true,
        'bootstrap': true,
        'react-router': true,
        'flux': true
    }, _.map(resolve.alias, (value, key) => {
        return { [key]: true }
    })),

    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['babel?presets[]=react,presets[]=es2015', 'html-path-loader']
            }, {
                test: /\.(scss|css)/,
                exclude: /node_modules/,
                loaders: ['style', 'css', 'autoprefixer', 'sass', 'css-path-loader']
            }, {
                test: /\.(scss|css)/,
                include: /node_modules/,
                loaders: ['style', 'css', 'autoprefixer', 'sass']
            }, {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'url'
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
}, function (err, stats) {
})