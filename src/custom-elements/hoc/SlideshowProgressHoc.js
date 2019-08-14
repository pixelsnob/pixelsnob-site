
import store from '../../store';
import createObserver from '../../createObserver';

import { setSlideshowPhotoId } from '../../actions';
import { getSlideshowPhotos, getSlideshowPhotoByListIndex, getSlideshowPhoto } from '../../selectors';
import SlideshowProgress from '../SlideshowProgress.js';

customElements.define('slideshow-progress', SlideshowProgress);

export default class SlideshowProgressHoc extends HTMLElement {

  connectedCallback() {
    
    this.attachShadow({ mode: 'open' });
    this._$progress = document.createElement('slideshow-progress');
    this._$progress.addEventListener('click', this._onClick.bind(this)); //////////////////////////////
    this.shadowRoot.appendChild(this._$progress);
    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotoId: state.slideshowPhotoId, slideshowPhotos: state.slideshowPhotos }),
      (key, value) => {
        this._updateProgress();
      }
    );
  }

  _updateProgress() {

    const state = store.getState();
    const slideshowPhoto = getSlideshowPhoto(state);
    if (!slideshowPhoto) {
      return null
    }
    
    this._$progress.setAttribute('list-length', state.slideshowPhotos.length);
    this._$progress.setAttribute('current-index', slideshowPhoto.listIndex);
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
    this._$progress.removeEventListener('click', this._onClick.bind(this));
  }
}
