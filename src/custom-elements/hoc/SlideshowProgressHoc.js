
import store from '../../store';
import { setSlideshowPhotoId } from '../../actions';
import { getSlideshowPhotos, getSlideshowPhotoByListIndex } from '../../selectors';
import SlideshowProgress from '../SlideshowProgress.js';

customElements.define('slideshow-progress', SlideshowProgress);

export default class SlideshowProgressHoc extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });

    const $progress = document.createElement('slideshow-progress');
    $progress.addEventListener('click', this._onClick.bind(this));
    this.shadowRoot.appendChild($progress);

    const $progressStats = this.querySelector('[slot="progress-stats"]');
    $progress.appendChild($progressStats);

    const $progressBar = this.querySelector('[slot="progress-bar"]');
    $progress.appendChild($progressBar);
    
  }

  _onClick(ev) {
    ev.preventDefault();
    const slideshowPhotos = getSlideshowPhotos(store.getState());
    if (slideshowPhotos) {
      // Load a photo by list index, based on where the progress bar was clicked.
      const listIndex = Math.ceil((ev.clientX / window.innerWidth) * (slideshowPhotos.length - 1));
      const photo = getSlideshowPhotoByListIndex({ ...store.getState(), listIndex });
      if (photo) {
        store.dispatch(setSlideshowPhotoId(photo.id));
      }
    }
  }

  disconnectedCallback() {
    $progress.removeEventListener('click', this._onClick.bind(this));
  }
}
