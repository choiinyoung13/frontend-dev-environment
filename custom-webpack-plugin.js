class MyWebpackPlugin {
  apply(compiler) {
    // compiler.hooks.done.tap('My Plugin', stats => {
    //   console.log('MyPlugin: done')
    // })

    compiler.hooks.compilation.tap('MyWebpackPlugin', compilation => {
      compilation.hooks.processAssets.tap(
        {
          name: 'MyWebpackPlugin',
          stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        assets => {
          const source = assets['main.js'].source()
          // source <- 번들링한 결과물 소스가 출력됨

          const banner = [
            `/**`,
            ` * 이것은 BannerPlugin이 처리한 결과입니다.`,
            ` * Build Date: 2026-01-09`,
            ` */`,
          ].join('\n')

          assets['main.js'] = {
            source: () => banner + '\n\n' + source,
            size: () => banner.length + source.length + 2,
          }
        }
      )
    })
  }
}

module.exports = MyWebpackPlugin
