'use strict';
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const NODE_MODULES = /node_modules/;

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    target: 'node',
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: NODE_MODULES,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { "presets": ["@babel/preset-env"] }
                    }
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({ TEMPLATE_LIST: JSON.stringify(require('./getTemplateList.js'))})
    ],
    mode: 'production'   //production, development
}