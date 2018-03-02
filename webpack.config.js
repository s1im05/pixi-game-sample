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
        extensions:['.ts', '.tsx', '.js'],
        alias: {}
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    'sass-loader?sourceMap'
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    },
    plugins: process.env.NODE_ENV === 'production' ? [new webpack.optimize.UglifyJsPlugin()] : []
};
