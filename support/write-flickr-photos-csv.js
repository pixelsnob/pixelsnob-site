
const Flickr = require("flickrapi");
const fs = require('fs');
const stringify = require('csv-stringify');
const config = require('../config');

const flickrOptions = {
  api_key: config.api_key,
  secret: config.secret
};

const connect = function() {
  return new Promise(function(resolve, reject) {
    Flickr.tokenOnly(flickrOptions, function(err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const getPhotos = function(flickr, options) {
  return new Promise(function(resolve, reject) {
    flickr.people.getPhotos(options, function(err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};


connect().then(async function(flickr) {
  const res = await getPhotos(flickr, {
		user_id: 'pixelsnob',
		page: 1,
		per_page: 500,
    extras: 'url_o, url_s, url_c'
  });
  return [ flickr, res.photos ];
}).then(async function([ flickr, photos ]) {
  
  const data = [];
  for (let photo of photos.photo) {
    //console.log(photo);

    data.push({
      id: photo.id,
      url_o: photo.url_o,
      url_s: photo.url_s
    });

    // await new Promise(next => {

    //   flickr.photos.getInfo({
    //     user_id: 'pixelsnob',
    //     photo_id: photo.id,
    //     secret: photo.secret
    //   }, function(err, result) {
    //     console.log(photo, result.photo);
    //     console.log('--------------------------------------');
    //     next();
    //   });
    
    // });
  }
  const columns = [ 'id', 'url_s', 'url_o' ];
  //console.log(data.length);
  stringify(data, { header: true, columns }, (err, output) => {
    if (err) {
      console.error(err);
      process.exit();
      return null;
    }
    
    fs.writeFile(config.csv_write_path, output, (err) => {
      if (err) {
        console.error(err);
        process.exit();
        return null;
      }
      console.log('CSV saved');
      process.exit();
    });
  });

}).catch(function(err) {
  console.error(err);
  process.exit();
});
