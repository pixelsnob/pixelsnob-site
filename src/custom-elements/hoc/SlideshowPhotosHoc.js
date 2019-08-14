import store from '../../store';
import createObserver from '../../createObserver';

import { getSlideshowPhotos, getSlideshowPhoto } from '../../selectors';
import SlideshowPhotos from '../SlideshowPhotos.js';

customElements.define('slideshow-photos', SlideshowPhotos);

export default class SlideshowPhotosHoc extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });

    const $slideshowPhotos = document.createElement('slideshow-photos');
    this.shadowRoot.appendChild($slideshowPhotos);

    const $progress = document.createElement('slideshow-progress-hoc');
    $slideshowPhotos.appendChild($progress);
    $progress.slot = 'progress';
    
    const $nav = document.createElement('slideshow-nav-hoc');
    $slideshowPhotos.appendChild($nav);
    $nav.slot = 'nav';

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