
const Flickr = require("flickrapi");
const fs = require('fs');
const config = require('../config');

const http = require('https');

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

const blacklist = [ '3009777596', '2227708270', "8058436506", "8010809557", "8010815696", "7367261320", "7238962012", "7217036314", "7172005734", "7174196452", "7217037802", "7172007496", "6819496547", "6699030995", "5706103826", "5311262382", "5347353149", "5205222187", "4326634593", "4188968009", "3677834924", "3676841389", "3508730571", "3508189207", "3305671294", "3304794913", "3304791511", "3305616568", "3269154812","7793641340", "7793632458", "7554218602", "7545369368", "7545270194", "7541427916", "6971736206", "6968893964", "7114541961", "6968447046", "6942949492", "6935232094", "6867988163", "6867960673", "6839731525", "6827199727", "6827160611", "6827114733", "6827084349", "6819925183", "6819914455", "6819549171", "6819523785", "5961107267", "5886955940", "5332373790", "5332077806", "5332068432", "5331248805", "5313302194", "4421119701", "4399363779", "4396939659", "4383109673", "3677629244", "3661309677", "3661289361", "3199605979", "3085931794", "3072186127", "3009426094", "3008570647", "2654282511", "2605143912", "2589965279", "2579841746", "2557299632", "2224675525", "2222704652", "2211196160", "2210401403", "2211066366", "2210111092", "2207548011", "2207540487", "2200510872", "2195905367", "2196486440", "2195697117", "2196486030", "2186987792", "2186677260", "2186665688", "2185864749", "2185864539", "2186648790", "2165798628", "2165767408", "2153423707", "2150558524"];

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
  let i = 1;
  for (let photo of photos.photo) {
    const photoInfo = await getPhotoInfo(flickr, photo.id, photo.secret);
    if (blacklist.includes(photo.id)) {
      continue;
    }
    
    // if (i > 10) {
    //   break;
    // }

    // try {
    //   await download(photo.url_o, './tmp/images/flickr/' + photo.id + '.jpg');
    // } catch (err) {
    //   console.error('Error downloading ' + photo.url_o);
    //   continue;
    // }

    console.log('Adding photo', i);
    data.push({
      id: photo.id,
      url_o: photo.url_o,
      url_s: photo.url_s,
      date_taken: photoInfo.dates.taken,
      flickr_page_url: `https://www.flickr.com/photos/${config.user_id}/${photo.id}/in/dateposted-public/`,
      title: photo.title
    });
    i++;
    
  }

  fs.writeFile('_data/flickr-photos.json', JSON.stringify(data), function(err) {
    if (err) {
      console.error(err);
      process.exit();
      return null;
    }
    console.log('Done');
    process.exit();
  });

}).catch(function(err) {
  console.error(err);
  process.exit();
});
