const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const precss = require('precss');

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src'),
};
// Webpack configuration
module.exports = {
    entry: ['babel-polyfill', './src/index.jsx'],
    output: {
        path: paths.DIST,
        filename: 'app.bundle.js',
        publicPath: '/',
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules'),
        ],
        extensions: ['.js', '.jsx', '.scss'],
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'index.html'),
            filename: 'index.html',
            inject: 'body',
        }),
        new ExtractTextPlugin("styles.css"),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            }, {
                test: /\.(scss|sass|css)$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {importLoaders: 1}},
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins() {
                                    return [
                                        precss,
                                        autoprefixer('last 2 versions', 'ie 11'),
                                    ];
                                },
                            },
                        }, {
                            loader: 'sass-loader', // compiles SASS to CSS
                        },
                    ],
                }),
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader',
                }),
            }
        ],
    },
    devServer: {
        host: '0.0.0.0',
        historyApiFallback: true,
    }
};