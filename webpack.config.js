const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './main.ts'
    },
    output: {filename: 'bundle.js'},
    module: {
        loaders: [{
            test: /.ts$/,
            loader: 'ts-loader'
        }]
    }
};