const path = require('path');

module.exports = {
  optimization: {
   //splitChunks: { chunks: 'all' }
  },
  entry: [
    //"babel-polyfill",
    //'@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
    //'@webcomponents/webcomponentsjs/webcomponents-bundle.js',
    './src/index.js'
  ],
  output: {
    //chunkFilename: '[id].[hash].js',
    // https://reactjs.org/docs/cross-origin-errors.html
    //crossOriginLoading: "anonymous",
    //filename: '[name].[hash].js',
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
            presets: ['@babel/preset-env'],
            "plugins": [
              //'transform-es2015-modules-commonjs'
              //'syntax-dynamic-import'
             // "@babel/plugin-transform-classes",
             // "transform-class-properties"
            ]
          }
        }
      }
    ]
  }
};