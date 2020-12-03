const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//清除多余文件
const Manifest = require('webpack-manifest-plugin');
 module.exports = {
    devtool: 'inline-source-map',
    mode: 'development',
    // watch: true,
    entry: {
        index: './src/index.js',
        // about: './src/about.js',
        // vendor: './src/vendor/index.js', // webpack4 不鼓励这样做，建议 optimization.runtimeChunk 
    },
    output: {
        filename: '[name].[contenthash:5].bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        // extensions: ['.js'],
        alias: {
            "@": path.resolve(__dirname, './'),
            "src": path.resolve(__dirname, './src')
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            loader:['style-loader', 'css-loader']
        }, {
            test: /\.scss$/,
            loader: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'img/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            use: [
                {
                    loader: path.resolve(__dirname, './loader/loader.js'),
                    options: {
                        layout: 'Hellow~',
                        name: '😀'
                    }
                },
                
            ],
        }, 
        // webpack5 内置
        // {
        //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
        //     type: 'asset/resource',
        //   },
        {
            test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf|svg)$/,
            use:[
              {
                loader: 'url-loader',
                options:{
                  limit: 8192,
                  name: `layout/[name].[ext]`
                }
              }
            ]
          },
        ],
    },
    optimization: {
        // splitChunks: {
        //     chunks: 'all'
        // },
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
              },
            },
          },
        // runtimeChunk: {
        //     name: 'manifest'
        // }
        // runtimeChunk: {
        //     name: entrypoint => `runtimechunk~${entrypoint.name}`
        // }
    },
    devServer: {
        inline: false,
        contentBase: './build',
        port: 8081,
        inline: true,
        hot: true,
        allowedHosts: [], // 白名单
        // publicPath: path.resolve(__dirname, './serve')
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new HtmlPlugin({
            inject: true,
            chunks: ["index"],
            filename: 'index.html',
            template: 'src/index.html',
            title: 'development'
        }),
        // new HtmlPlugin({
        //     inject: true,
        //     chunks: ["about"],
        //     filename: 'about.html',
        //     template: 'src/about.html'
        // }),
        new Manifest(), // Manifest 表达了每个模块与bundle.js中的映射
    ]
}