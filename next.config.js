
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

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
]);
