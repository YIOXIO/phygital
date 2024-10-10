const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].js',
        publicPath: ''
    },

    mode: 'development',
    devServer: {
        static: {
            directory: path.resolve(__dirname, './dist'),
            publicPath: '/'
        },
        compress: true,
        port: 8080,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules'
            },
            {
                test: /\.(png|jpg|gif|webp)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name][ext]'
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/svg/[name][ext]'
                }
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            },
            {
                test: /\.(pdf|rtf|docx)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/documents/[name][ext]'
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                    'postcss-loader'
                ]
            },
            {
                test: /\.json$/,
                type: 'json',
                generator: {
                    filename: 'assets/[name][ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/participants.html',
            filename: 'participants.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ]
};