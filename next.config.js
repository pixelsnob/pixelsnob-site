
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
//const withSass = require('@zeit/next-sass');

const env = {};

// if (process.env.NODE_ENV == 'production') {
//   env.BASE_URL = 'https://friendsofosorniopark.org/';
//   env.DB_CONNECTION_STRING = 'mongodb://localhost:27017/friendsofosorniopark';
// } else {
//   env.BASE_URL = 'http://staging.friendsofosorniopark.org/';
//   env.DB_CONNECTION_STRING = 'mongodb://localhost:27017/friendsofosorniopark-staging';
// }

module.exports = withPlugins([
  [
    optimizedImages, {
      handleImages: [ 'jpg' ],
      optimizeImagesInDev: false,
      mozjpeg: {
        quality: 80,
      }
    }
  ]
  //{ distDir: './build' }
  //withSass
  // { env }
]);
