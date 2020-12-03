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
        rules: [],
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
        // minimize: true,
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
        new HtmlPlugin({
            inject: true,
            chunks: ["index"],
            filename: 'index.html',
            template: 'src/index.html',
            title: 'My app'
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