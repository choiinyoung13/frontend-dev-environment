const path = require('path')
const webpack = require('webpack')
const childProcess = require('child_process')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env, argv) => {
  const mode = argv.mode === 'development' ? 'development' : 'production'

  return {
    mode,
    entry: {
      main: './src/app.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve('./dist'),
      publicPath: './',
    },
    module: {
      rules: [
        /** custom loader 적용
         {
           test: /\.js$/,
           use: [path.resolve('./my-webpack-loader.js')],
         }, 
         **/

        /**
         CSS 로더 적용 (로더는 오른쪽에서 왼쪽으로 실행됨)
         webpack은 entry 포인트부터 시작해서 연결된 모든 모듈을 파싱하다가 CSS 파일을 만나면:
         1. css-loader: CSS 파일을 JavaScript 모듈로 변환 (CSS를 문자열로 변환)
         2. style-loader: 변환된 CSS를 <style> 태그로 만들어 DOM에 주입 (실제 스타일 적용)
        **/
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
          test: /\.(jpg|png)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 50000, // 50KB - 이보다 작으면 base64 인라인화, 크면 파일로 복사
            },
          },
          generator: {
            filename: '[name][ext]?[hash]',
          },
        },
      ],
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: `
         Build Date : ${new Date().toLocaleString()}
         Commit Version : ${childProcess.execSync('git rev-parse --short HEAD')}
         Author : ${childProcess.execSync('git config user.name')}
        `,
      }),
      new webpack.DefinePlugin({
        TWO: '1+1',
        CALC: JSON.stringify('1+1'),
        'api.domain': JSON.stringify('http://dev.api.domain.com'),
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        templateParameters: (compilation, assets, options) => {
          return {
            env: compilation.options.mode === 'development' ? '(개발용)' : '',
          }
        },
        minify:
          mode === 'production'
            ? {
                collapseWhitespace: true, // 빈칸 제거
                removeComments: true, // 주석 제거
              }
            : false,
      }),
      new CleanWebpackPlugin(), // build 돌리기전에 output을 한 번 비우고 빌드 돌려줌
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
