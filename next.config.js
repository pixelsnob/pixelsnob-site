
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const env = {};

if (process.env.NODE_ENV == 'production') {
  env.BASE_URL = 'https://pixelsnob.com/';
  //env.DB_CONNECTION_STRING = 'mongodb://localhost:27017/friendsofosorniopark';
} else {
  env.BASE_URL = 'http://pixelsnob.com:3002/';
  //env.DB_CONNECTION_STRING = 'mongodb://localhost:27017/friendsofosorniopark-staging';
}

module.exports = withPlugins([
  [
    optimizedImages, {
      handleImages: [ 'jpg' ],
      optimizeImagesInDev: false,
      mozjpeg: {
        quality: 80,
      }
    }
  ],
  { env }
]);
