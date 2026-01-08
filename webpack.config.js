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
  experiments: {
    topLevelAwait: true,
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    parser: {
      javascript: {
        harmony: true,
      },
    },
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        type: 'javascript/auto',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
