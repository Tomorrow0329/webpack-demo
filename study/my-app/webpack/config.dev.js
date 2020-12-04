const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//清除多余文件
const Manifest = require('webpack-manifest-plugin');
const baseConfig = require('./config.base')

const devConfig = {
    devtool: 'inline-source-map',
    mode: 'development',
    // watch: true,
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../build')
    },
    cache: {
        type: 'memory', // 提高性能tip3: 使用缓存，开发环境默认为 ‘memory’(memory === true)，生产环节默认 false
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
        new webpack.HotModuleReplacementPlugin(),
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

module.exports = merge(baseConfig, devConfig)