

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


store.dispatch(setSlideshowPhotos(photosJson as SlideshowPhoto[]));

