const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: ['whatwg-fetch', './main.ts']
    },
    output: {filename: 'bundle.js'},
    module: {
        loaders: [{
            test: /.ts$/,
            loader: 'ts-loader'
        }]
    },
    plugins: [
        // new UglifyJSPlugin()
    ]
};
