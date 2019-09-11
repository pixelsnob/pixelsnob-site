
// @ts-ignore
import photosJson from '../_data/flickr-photos.json';

import { setSlideshowPhotos } from './actions';
import store from './store';

import './custom-elements/PhotosList';
import './custom-elements/PhotosListNav';
import './custom-elements/PhotosListPhoto';
import './custom-elements/SiteOverlay';
import './custom-elements/SlideshowLayout';
import './custom-elements/SlideshowNav';
import './custom-elements/SlideshowNavLink';
import './custom-elements/SlideshowPhoto';
import './custom-elements/SlideshowPhotos';
import './custom-elements/SlideshowPhotos';
import './custom-elements/SlideshowProgress';
import './custom-elements/SlideshowProgressBar';
import './custom-elements/SlideshowProgressStats';

import './custom-elements/containers/PhotosListContainer';
import './custom-elements/containers/PhotosListNavContainer';
import './custom-elements/containers/SiteOverlayContainer';
import './custom-elements/containers/SlideshowContainer';
import './custom-elements/containers/SlideshowNavContainer';
import './custom-elements/containers/SlideshowOverlayConnectorContainer';
import './custom-elements/containers/SlideshowProgressContainer';

// Load photos json into store, add index #
const photos = photosJson.map((photo: SlideshowPhoto, listIndex: number) => {
  const { src, src_small, title, flickr_page_url, dominantColor } = photo;
  return {
    id: photo.id,
    // tslint:disable-next-line: object-literal-sort-keys
    dominantColor,
    flickr_page_url,
    listIndex,/// use indexOf instead
    src,
    src_small,
    title,
  };
});

store.dispatch(setSlideshowPhotos(photos));

