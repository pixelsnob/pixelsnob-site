
import lazyLoadImages from './lazyLoadImages';
import photosJson from '../_data/flickr-photos.json';
import store from './store';
import { setSlideshowPhotos } from './actions';

import SiteOverlay from './custom-elements/SiteOverlay.js';
import SlideshowPhoto from './custom-elements/SlideshowPhoto.js';
import SlideshowPhotos from './custom-elements/SlideshowPhotos.js';
import SlideshowNav from './custom-elements/SlideshowNav.js';
import PhotosList from './custom-elements/PhotosList.js';
import PhotosListPhoto from './custom-elements/PhotosListPhoto.js';


// Load photos json into store, add index #
const photos = photosJson.map((photo, listIndex) => {
  return {
    id: photo.id,
    listIndex,
    src: photo.url_o,
    src_small: photo.url_s,
    title: photo.title
  };
});

store.dispatch(setSlideshowPhotos(photos));

customElements.define('site-overlay', SiteOverlay);
customElements.define('slideshow-photo', SlideshowPhoto);
customElements.define('slideshow-photos', SlideshowPhotos);
customElements.define('slideshow-nav', SlideshowNav);
customElements.define('photos-list', PhotosList);
customElements.define('photos-list-photo', PhotosListPhoto);

lazyLoadImages();
