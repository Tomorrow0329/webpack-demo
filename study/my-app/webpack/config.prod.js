const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin');
const Manifest = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./config.base')

const prodConfig = {
    devtool: 'inline-source-map',
    mode: 'production',
    // watch: true,
    output: {
        filename: '[name].[contenthash:5].bundle.js',
        path: path.resolve(__dirname, '../build')
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
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
              compress: {
                drop_debugger: true,
                drop_console: false
              }
            }
          }),
          new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new HtmlPlugin({
            inject: true,
            chunks: ["index"],
            filename: 'index.html',
            template: 'src/index.html',
            title: 'My app'
        }),
        new Manifest(), // Manifest 表达了每个模块与bundle.js中的映射
    ]
}

module.exports = merge(baseConfig, prodConfig);
