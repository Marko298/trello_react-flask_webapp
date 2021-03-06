const path = require('path');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, 'frontend');
const APP_DIR = path.resolve(__dirname, 'static');
module.exports = {
    entry: [ 
        'babel-polyfill',
        'react-hot-loader/patch',
        BUILD_DIR + "/index.js"],
    output: {
        path: APP_DIR,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['react-hot-loader/webpack','babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader", 
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                   "postcss-loader"],
                exclude: /node_modules/
            },
            {
                test: '/\.svg$/',
                use: [
                    "babel-loader",
                  {
                    loader: "react-svg-loader",
                    options: {
                      jsx: true 
                    }
                  }]
            }
        ]
    },
    plugins: [
    ],
    devtool: 'eval',
    devServer: {
        contentBase: path.resolve(__dirname, "static/"),
        host: 'localhost',
        port: 3005,
        hot: true,
        stats: "errors-only",
        open: true,
        historyApiFallback: true
    }
}
// devtool: 'cheap-module-source-map',
// use: ['react-hot-loader/webpack', 'babel-loader'],