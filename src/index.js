
import photosJson from '../_data/flickr-photos.json';
import store from './store';
import { setSlideshowPhotos } from './actions';

import SlideshowProgressHoc from './custom-elements/hoc/SlideshowProgressHoc.js';
import SlideshowProgressStatsHoc from './custom-elements/hoc/SlideshowProgressStatsHoc.js';
import SlideshowProgressBarHoc from './custom-elements/hoc/SlideshowProgressBarHOC.js';
import SiteOverlayHoc from './custom-elements/hoc/SiteOverlayHoc.js';

import SlideshowPhoto from './custom-elements/SlideshowPhoto.js';
import SlideshowPhotos from './custom-elements/SlideshowPhotos.js';
import SlideshowNavHoc from './custom-elements/hoc/SlideshowNavHoc.js';

import SlideshowNavLinkHoc from './custom-elements/hoc/SlideshowNavLinkHoc.js';

import PhotosListHoc from './custom-elements/hoc/PhotosListHoc.js';
import PhotosListPhotoHoc from './custom-elements/hoc/PhotosListPhotoHoc.js';

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
customElements.define('slideshow-progress-stats-hoc', SlideshowProgressStatsHoc);
customElements.define('slideshow-progress-bar-hoc', SlideshowProgressBarHoc);

customElements.define('slideshow-nav-hoc', SlideshowNavHoc);
customElements.define('slideshow-nav-link-hoc', SlideshowNavLinkHoc);
customElements.define('slideshow-photo', SlideshowPhoto);
customElements.define('slideshow-photos', SlideshowPhotos);

customElements.define('photos-list-hoc', PhotosListHoc);
customElements.define('photos-list-photo-hoc', PhotosListPhotoHoc);