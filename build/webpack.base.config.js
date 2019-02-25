'use strict'
const fs = require('fs')
const config = require('./config')
const utils = require('./utils')

module.exports = {
  context: utils.resolve('.'),
  resolve: {
    extensions: ['.js', '.json'],//引入这些文件不需代扩展名
    alias: {//引入模块使用的别名
      '@': utils.resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [utils.resolve('src'), utils.resolve('node_modules/webpack-dev-server/client')] //必须处理这些文件夹下的脚本
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: /node_modules/,
        options: {
          limit: 10000, //小于10000字节转化为base64
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
