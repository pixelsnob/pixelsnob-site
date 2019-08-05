
import lazyLoadImages from './lazyLoadImages';
import photosJson from '../_data/flickr-photos.json';
import store from './store';
import { setSlideshowPhotos } from './actions';

import SlideshowProgress from './custom-elements/SlideshowProgress.js';
import SlideshowProgressStats from './custom-elements/SlideshowProgressStats.js';
import SlideshowProgressBar from './custom-elements/SlideshowProgressBar.js';

import SiteOverlay from './custom-elements/SiteOverlay.js';
import SlideshowPhoto from './custom-elements/SlideshowPhoto.js';
import SlideshowPhotos from './custom-elements/SlideshowPhotos.js';
import SlideshowNav from './custom-elements/SlideshowNav.js';
import SlideshowNavPrevious from './custom-elements/SlideshowNavPrevious.js';
import SlideshowNavClose from './custom-elements/SlideshowNavClose.js';
import SlideshowNavNext from './custom-elements/SlideshowNavNext.js';

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

customElements.define('slideshow-progress', SlideshowProgress);
customElements.define('slideshow-progress-stats', SlideshowProgressStats);
customElements.define('slideshow-progress-bar', SlideshowProgressBar);

customElements.define('slideshow-nav', SlideshowNav);
customElements.define('slideshow-nav-previous', SlideshowNavPrevious);
customElements.define('slideshow-nav-next', SlideshowNavNext);
customElements.define('slideshow-nav-close', SlideshowNavClose);

customElements.define('slideshow-photo', SlideshowPhoto);
customElements.define('slideshow-photos', SlideshowPhotos);

customElements.define('photos-list', PhotosList);
customElements.define('photos-list-photo', PhotosListPhoto);

lazyLoadImages();
