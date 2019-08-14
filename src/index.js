
import photosJson from '../_data/flickr-photos.json';
import store from './store';
import { setSlideshowPhotos } from './actions';

import SlideshowProgressHoc from './custom-elements/hoc/SlideshowProgressHoc.js';
import SlideshowProgressStats from './custom-elements/SlideshowProgressStats.js';
import SlideshowProgressBar from './custom-elements/SlideshowProgressBar.js';
import SiteOverlayHoc from './custom-elements/hoc/SiteOverlayHoc.js';

import SlideshowPhotosHoc from './custom-elements/hoc/SlideshowPhotosHoc.js';
import SlideshowPhoto from './custom-elements/SlideshowPhoto.js';

import SlideshowNavHoc from './custom-elements/hoc/SlideshowNavHoc.js';

import SlideshowNavLink from './custom-elements/SlideshowNavLink.js';

import PhotosListHoc from './custom-elements/hoc/PhotosListHoc.js';
import PhotosListPhoto from './custom-elements/PhotosListPhoto.js';

// Load photos json into store, add index #
const photos = photosJson.map((photo, listIndex) => {
  return {
    id: photo.id,
    listIndex,
    src: photo.url_o,
    src_small: photo.url_s,
    title: photo.title,
    flickr_page_url: photo.flickr_page_url
  };
});

store.dispatch(setSlideshowPhotos(photos));

customElements.define('site-overlay-hoc', SiteOverlayHoc);
customElements.define('slideshow-progress-hoc', SlideshowProgressHoc);
customElements.define('slideshow-progress-stats', SlideshowProgressStats);
customElements.define('slideshow-progress-bar', SlideshowProgressBar);

customElements.define('slideshow-nav-hoc', SlideshowNavHoc);
customElements.define('slideshow-nav-link', SlideshowNavLink);
customElements.define('slideshow-photo', SlideshowPhoto);
customElements.define('slideshow-photos-hoc', SlideshowPhotosHoc);

customElements.define('photos-list-hoc', PhotosListHoc);
customElements.define('photos-list-photo', PhotosListPhoto);