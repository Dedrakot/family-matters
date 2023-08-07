const path = require('path')
// const webpack = require('webpack')

const isProduction = process.env.NODE_ENV === 'production' 

module.exports = {
    entry: './src/index.js',
    target: ['web','es2020'],
    devServer: {
        port: 3000
    },
    mode: isProduction ? 'production' : 'development',
    resolve: {
        alias: {
            'env/const': path.resolve(__dirname, `env/const.${isProduction ? 'prod':'dev'}.js`)
        }
    },
    module: {
        rules: [
            { test: /\.svg$/, use: 'svg-inline-loader' },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]  },
            { test: /\.jsx?$/, use: 'babel-loader',
              exclude: /(node_modules|bower_components)/ }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    }
}
