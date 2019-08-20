import store from '../../store';
import createObserver from '../../createObserver';
import { customElementsDefineFromArray } from '../../customElements';

import { getSlideshowPhotos } from '../../selectors';
import SlideshowPhotos from '../SlideshowPhotos';
import SlideshowPhoto from '../SlideshowPhoto';
import SlideshowProgressContainer from './SlideshowProgressContainer';
import PhotosListNavContainer from './PhotosListNavContainer';

customElementsDefineFromArray([
  [ 'slideshow-photos', SlideshowPhotos ],
  [ 'slideshow-photo', SlideshowPhoto ],
  [ 'slideshow-progress-container', SlideshowProgressContainer ],
  [ 'photos-list-nav-container', PhotosListNavContainer ],
]);

export default class SlideshowContainer extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });

    const $slideshowPhotos = document.createElement('slideshow-photos');
    this.shadowRoot.appendChild($slideshowPhotos);

    const $progress = document.createElement('slideshow-progress-container');
    $slideshowPhotos.appendChild($progress);
    $progress.slot = 'progress';
    
    const $nav = document.createElement('slideshow-nav-container');
    $slideshowPhotos.appendChild($nav);
    $nav.slot = 'nav';


    const $photosListNav = document.createElement('photos-list-nav-container');
    $slideshowPhotos.appendChild($photosListNav);
    $photosListNav.slot = 'photos-list-nav';

    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotos: state.slideshowPhotos, slideshowPhotoId: state.slideshowPhotoId }),
      (key, value) => {

        const state = store.getState();
        switch (key) {
          case 'slideshowPhotos': {
            const photos = getSlideshowPhotos(state);
            $slideshowPhotos.photos = photos;
            break;
          }
          case 'slideshowPhotoId': {
            $slideshowPhotos.currentPhotoId = value;
            break;
          }
        }
      }
    );
  }

}