// 导入compression-webpack-plugin
// const CompressionPlugin = require('compression-webpack-plugin') //我通过iis开启的网址服务，暂时还不会开启gzip压缩，所以压缩没有暂时不使用
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 这是因为项目打包后，index会白屏，所以把路径改了
  publicPath: './',
  outputDir: 'dist',
  // 生产环境报错寻找源码不需要了
  productionSourceMap: false,
  devServer: {
    open: true,
    port: '8080'
  },
  // configureWebpack: config => {
  //   // 生产环境压缩
  //   if (process.env.NODE_ENV === 'production') {
  //     config.plugins.push(
  //       new CompressionPlugin({
  //         algorithm: 'gzip', // 压缩算法/功能
  //         test: /\.js$|\.html$|\.css$|\.svg$|\.jpg$\.jpeg/, // 匹配项目文件，以js或者以css结尾的才执行压缩
  //         threshold: 100, // 仅处理大于此大小的资产（以字节为单位）
  //         minRatio: 0.8, // 压缩比大于 0.8 的文件将不会被压缩
  //         deleteOriginalAssets: false // 是否删除原始文件
  //       })
  //     )
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
  //   }
  // },

  chainWebpack: config => {
    config.resolve.alias
      .set('common', resolve('src/components/common'))
      .set('js', resolve('src/assets/common'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/network'))
      .set('@', resolve('src/')).end()
    // config.plugin('webpack-bundle-analyzer') //首页文件大小检测
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },

  lintOnSave: false
}
