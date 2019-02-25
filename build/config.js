'use strict'
const path = require('path')

module.exports = {
  dev: {
    entry: 'src/index.js',
    // Paths
    assetsSubDirectory: 'static',

    https: false,
    host: '127.0.0.1',
    port: 4000,
    autoOpenBrowser: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map'
  },

  build: {
    entry: 'src/index.js',
    // Paths
    filename: 'mlist.js',
    CSSfilename: 'mlist.css',
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',

    /**
     * Source Maps
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // 是否生成gzip压缩文件
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  }
}
