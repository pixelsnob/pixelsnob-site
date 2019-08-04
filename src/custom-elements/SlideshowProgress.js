
import store from '../store';
import { setSlideshowPhotoId } from '../actions';
import { getSlideshowPhotos } from '../selectors';

export default class SlideshowProgress extends HTMLElement {

  constructor() {
    super();
  }
  
  connectedCallback() {
    this.addEventListener('click', this.onClick.bind(this));
  }

  onClick(ev) {
    ev.preventDefault();
    const slideshowPhotos = getSlideshowPhotos(store.getState());
    if (slideshowPhotos) {
      // Load a photo by list index, based on where the progress bar was clicked.
      const listIndex = Math.ceil((ev.clientX / window.innerWidth) * (slideshowPhotos.length - 1));
      const photo = slideshowPhotos.find(photo => photo.listIndex === listIndex);
      if (photo) {
        store.dispatch(setSlideshowPhotoId(photo.id));
      }
    }
  }

  disconnectedCallback() {
    if (this._storeUnsubscribe) {
      this._storeUnsubscribe();
    }
    this.removeEventListener('click', this.onClick.bind(this));
  }
}
