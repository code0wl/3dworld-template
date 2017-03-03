module.exports = {
    entry: './src/modules/world.ts',
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