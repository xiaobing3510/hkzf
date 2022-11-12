const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            blue: '#1cb676',
            '@nav-bar-background-color': '#1cb676',
            '@nav-bar-icon-color': '#fff',
            '@nav-bar-title-text-color': '#fff',
            'search-label-padding': '0 10px',
            'index-bar-index-line-height': '28px',
            'index-anchor-text-color': '#888',
            'cell-text-color': '#646566'
          }
        }
      }
    }
  }
})
