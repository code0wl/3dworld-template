module.exports = {
    entry: './src/main.ts',
    output: { filename: 'bundle.js' },
    resolve: {
        extensions: ['.js', '.ts', '']
    },
    module: {
        loaders: [{
            test: /.ts$/,
            loader: 'ts-loader'
        }]
    }
}