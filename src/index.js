
import photosJson from '../_data/flickr-photos.json';
import store from './store';
import { setSlideshowPhotos } from './actions';
import { customElementsDefineFromArray } from './customElements';

import SiteOverlayContainer from './custom-elements/containers/SiteOverlayContainer';
import SlideshowContainer from './custom-elements/containers/SlideshowContainer';
import SlideshowNavContainer from './custom-elements/containers/SlideshowNavContainer';
import PhotosListContainer from './custom-elements/containers/PhotosListContainer';

// Load photos json into store, add index #
const photos = photosJson.map((photo, listIndex) => {
  return {
    id: photo.id,
    listIndex,/// use indexOf instead
    src: photo.url_o,
    src_small: photo.url_s,
    title: photo.title,
    flickr_page_url: photo.flickr_page_url
  };
});

store.dispatch(setSlideshowPhotos(photos));

customElementsDefineFromArray([
  [ 'site-overlay-container', SiteOverlayContainer ],
  [ 'slideshow-nav-container', SlideshowNavContainer ],
  [ 'slideshow-container', SlideshowContainer ],
  [ 'photos-list-container', PhotosListContainer ]
]);






// console.log(photos.length)

// setInterval(() => {
//   const tmpPhotos = [ ...store.getState().slideshowPhotos ];
//   tmpPhotos.pop();
//   store.dispatch(setSlideshowPhotos(tmpPhotos));
// }, 4000);

// store.subscribe(() => {
//   //console.log(store.getState().slideshowPhotoId);
// });