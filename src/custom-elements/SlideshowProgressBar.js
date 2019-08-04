
import store from '../store';
import createObserver from '../createObserver';
import { getSlideshowPhoto, getSlideshowPhotos } from '../selectors';

export default class SlideshowProgressBar extends HTMLElement {

  constructor() {
    super();
  }
  
  connectedCallback() {
    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotoId: state.slideshowPhotoId, slideshowPhotos: state.slideshowPhotos }),
      (key, value) => {
        if (key === 'slideshowPhotoId') {
          this.updateProgress(value);
        }
      }
    );
  }

  updateProgress(slideshowPhotoId) {
    this.style.width = '0';
    const state = store.getState();
    const photo = getSlideshowPhoto(state);
    const slideshowPhotos = getSlideshowPhotos(state);
    if (photo && slideshowPhotos && slideshowPhotos.length) {
      const percent = (photo.listIndex / (slideshowPhotos.length - 1)) * 100;
      this.style.width = percent + '%';
    }
  }

  disconnectedCallback() {
    if (this._storeUnsubscribe) {
      this._storeUnsubscribe();
    }
  }
}
