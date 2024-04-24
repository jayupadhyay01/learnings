module.exports = {
    entry: './block/block.js',
    output: {
        path: __dirname,
        filename: 'block/block.build.js',
    },
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
};