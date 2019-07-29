

import './touch.js';
import './lazy-load-background-images';
import store from './store';

import SiteOverlay from './custom-elements/SiteOverlay.js';
import SlideshowPhoto from './custom-elements/SlideshowPhoto.js';
import SlideshowPhotos from './custom-elements/SlideshowPhotos.js';
import SlideshowNav from './custom-elements/SlideshowNav.js';
import PhotosListPhoto from './custom-elements/PhotosListPhoto.js';

customElements.define('site-overlay', SiteOverlay);
customElements.define('slideshow-photo', SlideshowPhoto);
customElements.define('slideshow-photos', SlideshowPhotos);
customElements.define('slideshow-nav', SlideshowNav);
customElements.define('photos-list-photo', PhotosListPhoto);

// store.subscribe(() => {
//   console.log(store.getState());
// })
// document.addEventListener('keydown', function(evt) {
//   switch(evt.keyCode) {
//     case 37:
//     case 38:
//       document.dispatchEvent(new CustomEvent('slideshow-photos-show-previous'));
//     break;
//     case 39:
//     case 40:
//       document.dispatchEvent(new CustomEvent('slideshow-photos-show-next'));
//     break;
//     case 27:
//       document.dispatchEvent(new CustomEvent('site-overlay-hide'));
//     break;
//   }
// });

//event delegator?