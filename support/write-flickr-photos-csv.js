
const Flickr = require("flickrapi");
const fs = require('fs');
const csvStringify = require('csv-stringify');
const config = require('../config');

const http = require('https');
//var fs = require('fs');


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

const blacklist = ["7793641340", "7793632458", "7554218602", "7545369368", "7545270194", "7541427916", "6971736206", "6968893964", "7114541961", "6968447046", "6942949492", "6935232094", "6867988163", "6867960673", "6839731525", "6827199727", "6827160611", "6827114733", "6827084349", "6819925183", "6819914455", "6819549171", "6819523785", "5961107267", "5886955940", "5332373790", "5332077806", "5332068432", "5331248805", "5313302194", "4421119701", "4399363779", "4396939659", "4383109673", "3677629244", "3661309677", "3661289361", "3199605979", "3085931794", "3072186127", "3009426094", "3008570647", "2654282511", "2605143912", "2589965279", "2579841746", "2557299632", "2224675525", "2222704652", "2211196160", "2210401403", "2211066366", "2210111092", "2207548011", "2207540487", "2200510872", "2195905367", "2196486440", "2195697117", "2196486030", "2186987792", "2186677260", "2186665688", "2185864749", "2185864539", "2186648790", "2165798628", "2165767408", "2153423707", "2150558524"];

var download = function(url, dest, cb) {
  return new Promise((resolve, reject) => {
    var file = fs.createWriteStream(dest);
    http.get(url, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close(cb);
        resolve();
      });
    });
  });
};

connect().then(async function(flickr) {
  console.log('Fetching photos...');
  const res = await getPhotos(flickr);
  
  return [ flickr, res.photos ];
}).then(async function([ flickr, photos ]) {
  console.log('Fetching info for each photo...');

  const data = [];
  for (let photo of photos.photo) {
    const photoInfo = await getPhotoInfo(flickr, photo.id, photo.secret);
    if (blacklist.includes(photo.id)) {
      continue;
    }

    try {
      await download(photo.url_o, './assets/images/flickr/' + photo.id + '.jpg');
    } catch (err) {
      console.error('Error downloading ' + photo.url_o);
      continue;
    }

    data.push({
      id: photo.id,
      url_o: photo.url_o,
      url_s: photo.url_s,
      date_taken: photoInfo.dates.taken,
      flickr_page_url: `https://www.flickr.com/photos/${config.user_id}/${photo.id}/in/dateposted-public/`,
      title: photo.title
    });
  }

  // Write csv
  const columns = [ 'id', 'title', 'url_s', 'url_o', 'date_taken', 'flickr_page_url' ];

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
