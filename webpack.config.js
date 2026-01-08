const path = require('path')

module.exports = {
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
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
