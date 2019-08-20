const path = require('path');

module.exports = {
  optimization: {
   //splitChunks: { chunks: 'all' }
  },
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
            //presets: ['@babel/preset-env']
            "plugins": [
              'syntax-dynamic-import'
             // "@babel/plugin-transform-classes",
             // "transform-class-properties"
            ]
          }
        }
      }
    ]
  }
};