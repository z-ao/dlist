const config = require('./config')
const path = require('path')
//处理当前文件夹的相对路径
const resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}

//静态资源存放地方
const assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path) //兼容的方式交互 因为在windows环境和在unix环境path返回值有差异
}

const fetchDirName = function (_path) {
  var pwd = path.join(__dirname, '.', _path)
  var componetName = pwd.split('/').slice(-1).toString()
  return componetName
}

exports.resolve = resolve;
exports.assetsPath = assetsPath;
exports.fetchDirName = fetchDirName;
