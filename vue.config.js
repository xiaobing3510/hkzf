const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            blue: '#1cb676',
            '@nav-bar-background-color': '#1cb676',
            '@nav-bar-icon-color': '#fff',
            '@nav-bar-title-text-color': '#fff',
            'search-label-padding': '0 10px'
          }
        }
      }
    }
  }
})
