const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const config = require('./config')
const utils = require('./utils')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  entry: utils.resolve(config.build.entry),
  output: {
    filename: config.build.filename,
    path: config.build.assetsRoot,
    library: utils.fetchDirName('..'),
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      }
    ]
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  plugins: [
    new UglifyJsPlugin({ //压缩js
        uglifyOptions: {
        compress: {
          warnings: false,
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),

    new ExtractTextPlugin({
      filename: config.build.CSSfilename,
      allChunks: true,
    }),

    //样式压缩
    new OptimizeCSSPlugin({
      cssProcessorOptions: {safe: true}
    })
  ]
})
//如果服务器开启压缩
//生成gz结尾的压缩文件
//服务器会优先获取请求资源的gz结尾的文件
//然后在浏览器解压
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: true
    })
  )
}

module.exports = webpackConfig
