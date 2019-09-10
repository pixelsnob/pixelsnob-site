

import photosJson from '../_data/flickr-photos.json';
import store from './store';
import { setSlideshowPhotos } from './actions';

import './custom-elements/PhotosList';
import './custom-elements/PhotosListPhoto';

import './custom-elements/containers/SlideshowProgressContainer';
import './custom-elements/SlideshowProgress';
import './custom-elements/SlideshowProgressBar';
import './custom-elements/SlideshowProgressStats';

import './custom-elements/containers/SlideshowNavContainer';
import './custom-elements/SlideshowNav';
import './custom-elements/SlideshowNavLink';

import './custom-elements/containers/SlideshowOverlayConnectorContainer';
import './custom-elements/containers/SiteOverlayContainer';
import './custom-elements/SiteOverlay';

import './custom-elements/containers/SlideshowContainer';
import './custom-elements/SlideshowPhoto';
import './custom-elements/SlideshowPhotos';

import './custom-elements/SlideshowPhotos';
import './custom-elements/containers/PhotosListContainer';

import './custom-elements/containers/PhotosListNavContainer';
import './custom-elements/PhotosListNav';

import './custom-elements/SlideshowLayout';

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
store.dispatch(setSlideshowPhotos(photos));

// console.log(photos.length)

// setInterval(() => {
//   const tmpPhotos = [ ...store.getState().slideshowPhotos ];
//   tmpPhotos.pop();
//   store.dispatch(setSlideshowPhotos(tmpPhotos));
// }, 4000);

//store.subscribe(() => {
  //console.log('state update', store.getState());
//});