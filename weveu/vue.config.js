module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa         : {
    iconPaths: {
      favicon32     : 'favicon.ico',
      favicon16     : 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon      : 'favicon.ico',
      msTileImage   : 'favicon.ico'
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= '南京工业大学“小e行”江苏青年红色寻迹党史学习实践团'
        return args
      })
  }
}
