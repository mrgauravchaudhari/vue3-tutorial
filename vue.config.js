const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/scss/base.scss";'
      }
    }
  },
  runtimeCompiler: true
})
