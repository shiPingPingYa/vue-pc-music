// 导入compression-webpack-plugin
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  // 这是因为项目打包后，index会白屏，所以把路径改了
  publicPath: './',
  outputDir: 'dist',
  // 生产环境报错寻找源码不需要了
  productionSourceMap: false,
  configureWebpack: (config) => {
    // 生产环境压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip', // 压缩算法/功能
          test: /\.js$|\.html$|\.css/, // 匹配项目文件，以js或者以css结尾的才执行压缩
          threshold: 10240, // 仅处理大于此大小的资产（以字节为单位）
          minRatio: 0.8, // 压缩比大于 0.8 的文件将不会被压缩
          deleteOriginalAssets: false // 是否删除原始文件
        })
      )
    }
  }
}
