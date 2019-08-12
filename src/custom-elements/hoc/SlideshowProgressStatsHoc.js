
import store from '../../store';
import createObserver from '../../createObserver';
import { getSlideshowPhoto, getSlideshowPhotos } from '../../selectors';

import SlideshowProgressStats from '../SlideshowProgressStats.js';

customElements.define('slideshow-progress-stats', SlideshowProgressStats);

export default class SlideshowProgressStatsHoc extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const $progressStats = document.createElement('slideshow-progress-stats');
    $progressStats.slot = 'progress-stats';
    this.shadowRoot.appendChild($progressStats);
    
    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotoId: state.slideshowPhotoId, slideshowPhotos: state.slideshowPhotos }),
      (key, value) => {
        if (key === 'slideshowPhotoId') {
          const slideshowPhotos = getSlideshowPhotos(store.getState());
          const currentSlideshowPhoto = getSlideshowPhoto({ ...store.getState(), slideshowPhotoId: value });
          if (currentSlideshowPhoto && slideshowPhotos.length) {
            $progressStats.setAttribute('current-index', currentSlideshowPhoto.listIndex);
            $progressStats.setAttribute('list-length', slideshowPhotos.length);

          }
        }
      }
    );
  }

  disconnectedCallback() {
    if (this._storeUnsubscribe) {
      this._storeUnsubscribe();
    }
  }
}
