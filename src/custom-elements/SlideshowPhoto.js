
import store from '../store';
import createObserver from '../createObserver';
import { setImageLoaded } from '../actions';

export default class SlideshowPhoto extends HTMLElement {

  connectedCallback() {
    this.update();
    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotoId: state.slideshowPhotoId }),
      this.update.bind(this)
    );
  }

  disconnectedCallback() {
    this.classList.remove('photo-visible');
    this._storeUnsubscribe();
  }

  update(slideshowPhotoId) {
    if (slideshowPhotoId === this.dataset.id) {
      
      const state = store.getState();
      const existingImg = this.querySelector('img');
      const isImageLoaded = state.loadedImages.find(image => image === existingImg.dataset.src);
      
      if (isImageLoaded) {
        existingImg.src = existingImg.dataset.src;
        this.className = 'photo-visible';
        this.prefetchNext(slideshowPhotoId);
      } else {
        const tmpImg = new Image;
        tmpImg.onload = evt => {
          // The current id could have changed by the time this loads
          if (store.getState().slideshowPhotoId === slideshowPhotoId) {
            this.className = 'photo-visible';
          } else {
            this.className = '';
          }
          // Add to image cache
          store.dispatch(setImageLoaded(existingImg.dataset.src));
          this.prefetchNext(slideshowPhotoId);
        };
        tmpImg.src = existingImg.dataset.src;
        existingImg.src = tmpImg.src;
      }

    } else {
      this.className = '';
    }
  }

  prefetchNext(slideshowPhotoId) {
    const photos = store.getState().slideshowPhotos;
    const current = photos.find(photo => photo.id === slideshowPhotoId);
    if (current) {
      const next = photos.find(photo => photo.listIndex === current.listIndex + 1);
      // check if loaded
      if (next) {
        let tmpImg = new Image;
        tmpImg.onload = evt => {
          store.dispatch(setImageLoaded(next.src));
        };
        tmpImg.src = next.src;
      }
      const previous = photos.find(photo => photo.listIndex === current.listIndex - 1);
      //console.log(previous)

      if (previous) {
        let tmpImg = new Image;
        tmpImg.onload = evt => {
          store.dispatch(setImageLoaded(previous.src));
        };
        tmpImg.src = previous.src;
      }

    }
  }
}
