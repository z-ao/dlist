const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const config = require('./config')
const utils = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  entry: utils.resolve(config.dev.entry),
  output:{
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader','css-loader', 'less-loader']
      }
    ]
  },
  devServer: {
    host: config.dev.host || '0.0.0.0',
    port: config.dev.port,
    compress: true, //一切服务都启用gzip 压缩
    publicPath: '/',
    inline: true,
    quiet: true,
    open: config.dev.autoOpenBrowser,
    hot: true, //启用 webpack 的模块热替换特性
    noInfo: true //过滤很多无关内容
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //启动热加载

    new HtmlWebpackPlugin({
      template: utils.resolve('public/index.html'),
      //所有的静态资源插入尾部
      inject: true
    })
  ]
})

module.exports = webpackConfig;
