
import store from '../store';
import createObserver from '../createObserver';
import { setImageLoaded } from '../actions';

export default class SlideshowPhoto extends HTMLElement {

  connectedCallback() {
    this.update();
    const observer = createObserver(store);

    // This should only fire for the properties declared
    this._storeUnsubscribe = observer(
      state => ({ slideshowPhotoId: state.slideshowPhotoId }),
      this.update.bind(this)
    )
  }

  disconnectedCallback() {
    this.classList.remove('photo-visible');
    this._storeUnsubscribe();
  }

  update(slideshowId) {
    if (slideshowId === this.dataset.id) {
      this.loadImage(this.dataset.id);
    } else {
      this.className = '';
    }
  }

  loadImage(id) {
    const state = store.getState();
    const existingImg = this.querySelector('img');
    const isImageLoaded = state.loadedImages.find(image => image === existingImg.dataset.src);
    
    if (isImageLoaded) {
      existingImg.src = existingImg.dataset.src;
      this.className = 'photo-visible';
      
    } else {
      const tmpImg = new Image;
      tmpImg.onload = evt => {
        // The current id could have changed by the time this loads
        if (store.getState().slideshowPhotoId === id) {
          this.className = 'photo-visible';
        } else {
          this.className = '';
        }
        // Add to image cache
        store.dispatch(setImageLoaded(existingImg.dataset.src));
      };
      tmpImg.src = existingImg.dataset.src;
      existingImg.src = tmpImg.src;
    }

  }

}
