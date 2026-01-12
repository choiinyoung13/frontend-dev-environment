const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
  const mode = argv.mode === 'development' ? 'development' : 'production'

  return {
    mode: 'development',
    entry: {
      main: './src/app.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve('./dist'),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            mode === 'production'
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpg|svg|gif)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 10000, // 10KB - 이보다 작으면 base64 인라인화, 크면 파일로 복사
            },
          },
          generator: {
            filename: '[name][ext]?[hash]', // 원본 파일명 유지
          },
        },
      ],
    },
    /**
     * TODO: 아래 플러그인을 추가해서 번들 결과를 만들어 보세요.
     * 1. BannerPlugin: 결과물에 빌드 시간을 출력하세요.
     * 2. HtmlWebpackPlugin: 동적으로 html 파일을 생성하세요.
     * 3. CleanWebpackPlugin: 빌드 전에 아웃풋 폴더를 깨끗히 정리하세요.
     * 4. MiniCssExtractPlugin: 모듈에서 css 파일을 분리하세요.
     */
    plugins: [
      new webpack.BannerPlugin({
        banner: `Build Time: ${new Date().toLocaleString()}`,
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        templateParameters: (compilation, assets, options) => {
          return {
            env: compilation.options.mode === 'development' ? '(개발용)' : '',
          }
        },
      }),
      new CleanWebpackPlugin(),
      ...(mode === 'production'
        ? [
            new MiniCssExtractPlugin({
              filename: '[name].css',
            }),
          ]
        : []),
    ],
  }
}
