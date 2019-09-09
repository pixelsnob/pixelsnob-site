

import photosJson from '../_data/flickr-photos.json';
import store from './store';
import { setSlideshowPhotos } from './actions';

import './custom-elements/containers/SlideshowOverlayConnectorContainer';
import './custom-elements/containers/SiteOverlayContainer';
import './custom-elements/containers/SlideshowContainer';
import './custom-elements/SlideshowPhotoComponent';
import './custom-elements/SlideshowPhotosComponent';
import './custom-elements/containers/PhotosListContainer';
//import './custom-elements/containers/PhotosListNavContainer';
import './custom-elements/containers/SlideshowNavContainer';
// import './custom-elements/containers/SlideshowOverlayConnectorContainer';
// import './custom-elements/containers/SlideshowProgressContainer';

// import './custom-elements/SlideshowLayout';
// import './custom-elements/SlideshowPhotosComponent';
// import './custom-elements/SlideshowPhotoComponent';

// Load photos json into store, add index #
const photos = photosJson.map((photo, listIndex) => {
  return {
    id: Number(photo.id),
    listIndex,/// use indexOf instead
    src: photo.url_o,
    src_small: photo.url_s,
    title: photo.title,
    flickr_page_url: photo.flickr_page_url,
    dominantColor: photo.dominantColor
  };
});
//console.log(WebComponents)
store.dispatch(setSlideshowPhotos(photos));

// customElementsDefineFromArray([
//   [ 'site-overlay-container', SiteOverlayContainer ],
//   [ 'slideshow-nav-container', SlideshowNavContainer ],
//   [ 'slideshow-container', SlideshowContainer ],
//   [ 'photos-list-container', PhotosListContainer ]
// ]);

//sessionStorage.setItem('loaded-images', []);




// console.log(photos.length)

// setInterval(() => {
//   const tmpPhotos = [ ...store.getState().slideshowPhotos ];
//   tmpPhotos.pop();
//   store.dispatch(setSlideshowPhotos(tmpPhotos));
// }, 4000);

store.subscribe(() => {
  //console.log('state update', store.getState());
});