const path = require('path');

module.exports = {
  optimization: {
   //splitChunks: { chunks: 'all' }
  },
  entry: [
    //"babel-polyfill",
    './src/index'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  module: {
    
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [ /node_modules/, /_site/ ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
           //"plugins": [["@babel/plugin-proposal-decorators", { "legacy": true }]]
          }
        }
      }
    ]
  }
};