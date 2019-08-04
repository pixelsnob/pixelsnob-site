
import store from '../store';
import createObserver from '../createObserver';
import preloadImage from '../preloadImage';
import { getSlideshowPhoto } from '../selectors';

export default class SlideshowPhoto extends HTMLElement {

  connectedCallback() {
    this.update();
    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotoId: state.slideshowPhotoId }),
      (key, value) => {
        this.update(value);
      }
    );
    
  }

  disconnectedCallback() {
    this.classList.remove('photo-visible');
    this._storeUnsubscribe();
  }

  update(slideshowPhotoId) {
    if (slideshowPhotoId !== this.dataset.id) {
      this.className = '';
      return null;
    }
    
    const currentPhoto = getSlideshowPhoto({ ...store.getState(), slideshowPhotoId });
    if (!currentPhoto) {
      this.className = '';
      return null;
    }

    let img = this.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      this.appendChild(img);
      img.setAttribute('data-src', currentPhoto.src/*window.innerWidth > 640 ? currentPhoto.src : currentPhoto.src_small*/);
      img.setAttribute('alt', currentPhoto.title);
    }
    
    preloadImage(currentPhoto.src, img).then(() => {
      // The current id could have changed by the time this loads
      if (store.getState().slideshowPhotoId === slideshowPhotoId) {
        this.className = 'photo-visible';
      } else {
        this.className = '';
      }
    });
  }
}
