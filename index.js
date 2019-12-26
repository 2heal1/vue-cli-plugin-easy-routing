const VueEasyRoutingPlugin = require('vue-cli-easy-route/lib/webpack-plugin.js')
module.exports = (api, options) => {
  const opts =
    (options.pluginOptions && options.pluginOptions.easyRouting) || {}

  const pluginOptions = {
    pages: 'src/pages',
    chunkNamePrefix: 'page-',
    redirectPath: 'index'
  }

  if (opts.pages != null) {
    pluginOptions.pages = opts.pages
  }
  if (opts.chunkNamePrefix != null) {
    pluginOptions.chunkNamePrefix = opts.chunkNamePrefix
  }
  if (opts.redirectPath != null) {
    pluginOptions.redirectPath = opts.redirectPath
  }

  api.chainWebpack(webpackConfig => {
    webpackConfig
      .plugin('vue-cli-easy-route')
      .use(VueEasyRoutingPlugin, [pluginOptions])
  })
}
