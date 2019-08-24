const path = require('path');

module.exports = {
  optimization: {
   //splitChunks: { chunks: 'all' }
  },
  entry: [
    //"babel-polyfill",
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
            //"plugins": []
          }
        }
      }
    ]
  }
};