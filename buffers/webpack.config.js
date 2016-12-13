const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'public'),
    entry: {
        webpack: 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        app: [path.resolve(__dirname, 'public/src/app/app.js'),'webpack-hot-middleware/client?path=/__webpack_hmr'] // entry point location to app
    },
    resolve: {
        root: [__dirname, path.join(__dirname, 'public/src/')]
    },
    output: {
        path: __dirname,
        publicPath: '/build/',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: [
                    path.join(__dirname, 'public/src')
                ],
                exclude: /\.html?$/,
                query: {
                  presets: 'es2015',
                }
            },
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader'
            // },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader',
            },
            {
                test: /\.woff|\.woff2|\.svg|.eot|\.png|\.jpg|\.ttf/,
                loader: 'url-loader?prefix=font/&limit=10000'
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        //new ExtractTextPlugin('main.css') // TODO: move to production config
    ],
    // Create Sourcemaps for the bundle
    devtool: 'source-map'
};