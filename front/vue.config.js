const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  devServer: {
    // 设置为0.0.0.0则所有的地址均能访问
    host: '0.0.0.0',
    port: 8080,
    https: false,
    // 跨域问题解决 代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3003', // 此处为后端提供的真实接口
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
})
