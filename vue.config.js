const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
   // 关闭eslint校验
  lintOnSave: false ,
  devServer: {
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            pathRewrite: {
                '/api': ''
            }
        }
    },
    client: {
        overlay: false
    }
}
})
