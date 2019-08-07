
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
import SlideshowNavLink from './custom-elements/SlideshowNavLink.js';

import PhotosList from './custom-elements/PhotosList.js';
import PhotosListPhoto from './custom-elements/PhotosListPhoto.js';

//import SiteSidePanel from './custom-elements/SiteSidePanel.js';

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

customElements.define('site-overlay', SiteOverlay);

customElements.define('slideshow-progress', SlideshowProgress);
customElements.define('slideshow-progress-stats', SlideshowProgressStats);
customElements.define('slideshow-progress-bar', SlideshowProgressBar);

customElements.define('slideshow-nav', SlideshowNav);
customElements.define('slideshow-nav-link', SlideshowNavLink);

customElements.define('slideshow-photo', SlideshowPhoto);
customElements.define('slideshow-photos', SlideshowPhotos);

customElements.define('photos-list', PhotosList);
customElements.define('photos-list-photo', PhotosListPhoto);

//customElements.define('site-side-panel', SiteSidePanel);

lazyLoadImages();
