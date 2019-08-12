
import store from '../../store';
import createObserver from '../../createObserver';
import { getSlideshowPhoto, getSlideshowPhotos } from '../../selectors';
import SlideshowProgressBar from '../SlideshowProgressBar.js';

customElements.define('slideshow-progress-bar', SlideshowProgressBar);

export default class SlideshowProgressBarHoc extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const $progressBar = document.createElement('slideshow-progress-bar');
    $progressBar.slot = 'progress-bar';
    this.shadowRoot.appendChild($progressBar);
    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotoId: state.slideshowPhotoId, slideshowPhotos: state.slideshowPhotos }),
      (key, value) => {
        if (key === 'slideshowPhotoId') {
          this.updateProgress();
        }
      }
    );
  }

  updateProgress() {
    const state = store.getState();
    const photo = getSlideshowPhoto(state);
    const slideshowPhotos = getSlideshowPhotos(state);
    if (photo && slideshowPhotos && slideshowPhotos.length) {
      const $progressBar = this.shadowRoot.querySelector('slideshow-progress-bar');
      $progressBar.setAttribute('current-index', photo.listIndex);
      $progressBar.setAttribute('list-length', slideshowPhotos.length);
    }
  }

  disconnectedCallback() {
    if (this._storeUnsubscribe) {
      this._storeUnsubscribe();
    }
  }
}
