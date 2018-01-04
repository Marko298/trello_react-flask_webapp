const path = require('path');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, 'frontend');
const APP_DIR = path.resolve(__dirname, 'static');

module.exports = {
    entry: ['babel-polyfill', BUILD_DIR + "/index.js"],
    output: {
        path: APP_DIR,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, "static/"),
        stats: "errors-only",
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    }
}