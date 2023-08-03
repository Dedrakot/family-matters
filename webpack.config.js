const path = require('path')
// const webpack = require('webpack')

module.exports = {
    entry: './src/index.js',
    target: ['web','es2020'],
    devServer: {
        port: 3000
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
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
