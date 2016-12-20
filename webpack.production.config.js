const path = require('path');
const config = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

config.entry = {
    app: path.resolve(__dirname, 'public/src/app/app.js')
};

config.module.loaders[1] = { // change the scss loader to ExtractTextPlugin
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'autoprefixer-loader', 'sass-loader')
};

config.plugins = [
    new ExtractTextPlugin('main.css') // TODO: move to production config
];

module.exports = config;
