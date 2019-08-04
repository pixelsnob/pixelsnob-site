
import store from '../store';
import createObserver from '../createObserver';
import { setSlideshowPhotoId } from '../actions';

export default class SlideshowProgress extends HTMLElement {

  constructor() {
    super();
    this._progressBar = document.createElement('div');
    this._progressBar.className = 'slideshow-progress-bar';
    
    this.addEventListener('click', this.onClick.bind(this));
    this.appendChild(this._progressBar);
    this._progressStats = document.createElement('span');
    this._progressStats.className = 'slideshow-progress-stats';
    this.appendChild(this._progressStats);
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
    this._progressBar.style.width = '0';
    this._progressStats.innerHTML = '';
    const slideshowPhotos = store.getState().slideshowPhotos;
    if (slideshowPhotos) {

      const photo = slideshowPhotos.find(photo => photo.id === slideshowPhotoId);
      if (photo) {
        const percent = (photo.listIndex / (slideshowPhotos.length - 1)) * 100;
        this._progressBar.style.width = percent + '%';
        this._progressStats.innerHTML = `${photo.listIndex + 1} of ${slideshowPhotos.length}`;
      }
    }
  }

  onClick(ev) {
    ev.preventDefault();
    const state = store.getState();
    if (state.slideshowPhotos) {
      // Load a photo by list index, based on where the progress bar was clicked.
      const listIndex = Math.ceil((ev.clientX / window.innerWidth) * (state.slideshowPhotos.length - 1));
      const photo = state.slideshowPhotos.find(photo => photo.listIndex === listIndex);
      if (photo) {
        store.dispatch(setSlideshowPhotoId(photo.id));
      }
    }
  }

  disconnectedCallback() {
    if (this._storeUnsubscribe) {
      this._storeUnsubscribe();
    }
    this._progressBar.removeEventListener('click', this.onClick.bind(this));
  }
}
