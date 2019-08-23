

import photosJson from '../_data/flickr-photos.json';
import store from './store';
import { setSlideshowPhotos } from './actions';
import { customElementsDefineFromArray } from './customElements';

import './custom-elements/containers/SiteOverlayContainer';
import './custom-elements/containers/SlideshowContainer';
//import SlideshowNavContainer from './custom-elements/containers/SlideshowNavContainer';
import './custom-elements/containers/PhotosListContainer';

// Load photos json into store, add index #
const photos = photosJson.map((photo, listIndex) => {
  return {
    id: String(photo.id),
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

sessionStorage.setItem('loaded-images', []);




// console.log(photos.length)

// setInterval(() => {
//   const tmpPhotos = [ ...store.getState().slideshowPhotos ];
//   tmpPhotos.pop();
//   store.dispatch(setSlideshowPhotos(tmpPhotos));
// }, 4000);

// store.subscribe(() => {
//   //console.log(store.getState().slideshowPhotoId);
// });