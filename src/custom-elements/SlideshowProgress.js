
import store from '../store';
import createObserver from '../createObserver';

export default class SlideshowProgress extends HTMLElement {

  constructor() {
    super();
    this._progress = document.createElement('div');
    this._progress.className = 'slideshow-progress-bar';
    this.appendChild(this._progress);
  }
  connectedCallback() {
    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotoId: state.slideshowPhotoId, slideshowPhotos: state.slideshowPhotos }),
      (key, value) => {
        if (key === 'slideshowPhotoId') {
          const slideshowPhotos = store.getState().slideshowPhotos;
          if (slideshowPhotos) {
            const photo = slideshowPhotos.find(photo => photo.id === value);
            if (photo) {
              const percent = (photo.listIndex / (slideshowPhotos.length - 1)) * 100;
              this._progress.style.width = percent + '%';
            }
            return null;
          }
        }
        this._progress.style.width = '0';
      }
    );
  }

  disconnectedCallback() {
    if (this._storeUnsubscribe) {
      this._storeUnsubscribe();
    }
  }
}
