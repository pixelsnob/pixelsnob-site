
const Flickr = require("flickrapi");
const fs = require('fs');
const csvStringify = require('csv-stringify');
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
    flickr.people.getPhotos({
      user_id: config.user_id,
      page: 1,
      per_page: 10000,
      extras: 'url_o, url_s, url_c',
      content_type: 1, // 1=photos only
    }, function(err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const getPhotoInfo = function(flickr, photo_id, secret) {
  return new Promise(function(resolve, reject) {
    flickr.photos.getInfo({
      user_id: config.user_id,
      photo_id,
      secret
    }, function(err, result) {
      if (err) {
        reject(err);
      }
      resolve(result.photo);
    });
  });
}

connect().then(async function(flickr) {
  console.log('Fetching photos...');
  const res = await getPhotos(flickr);
  
  return [ flickr, res.photos ];
}).then(async function([ flickr, photos ]) {
  console.log('Fetching info for each photo...');

  const data = [];
  for (let photo of photos.photo) {
    const photoInfo = await getPhotoInfo(flickr, photo.id, photo.secret);
    
    data.push({
      id: photo.id,
      url_o: photo.url_o,
      url_s: photo.url_s,
      date_taken: photoInfo.dates.taken,
      flickr_page_url: `https://www.flickr.com/photos/${config.user_id}/${photo.id}/in/dateposted-public/`
    });
  }

  // Write csv
  const columns = [ 'id', 'url_s', 'url_o', 'date_taken', 'flickr_page_url' ];

  csvStringify(data, { header: true, columns }, function(err, output) {
    if (err) {
      console.error(err);
      process.exit();
      return null;
    }
    console.log('Writing csv to ' + config.csv_write_path);

    fs.writeFile(config.csv_write_path, output, function(err) {
      if (err) {
        console.error(err);
        process.exit();
        return null;
      }
      console.log('Done');
      process.exit();
    });
  });

}).catch(function(err) {
  console.error(err);
  process.exit();
});
