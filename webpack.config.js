const webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: {
        main: ['./src/main.ts']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist/')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {}
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    },
    plugins: process.env.NODE_ENV === 'production' ? [new webpack.optimize.UglifyJsPlugin()] : []
};
