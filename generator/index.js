module.exports = api => {
  api.extendPackage({
    devDependencies: {
      'vue-cli-easy-route': '1.1.3'
    },
    vue: {
      pluginOptions: {
        easyRouting: {
          pages: 'src/pages',
          chunkNamePrefix: 'page-',
          redirectPath: 'index'
        }
      }
    }
  })
  api.render('./template')

  if (api.invoking) {
    api.postProcessFiles(files => {
      Object.keys(files).forEach(name => {
        if (/^src\/views[/$]/.test(name)) {
          delete files[name]
        }
      })
    })

    if (api.hasPlugin('typescript')) {
      api.postProcessFiles(files => {
        delete files['src/router.ts']
      })

      const convertFiles = require('@vue/cli-plugin-typescript/generator/convert')
      convertFiles(api)
    }
  }
}
