
import store from '../store';
import createObserver from '../createObserver';
import { getSlideshowPhoto, getSlideshowPhotos } from '../selectors';

export default class SlideshowProgressStats extends HTMLElement {

  constructor() {
    super();
  }
  
  connectedCallback() {
    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotoId: state.slideshowPhotoId, slideshowPhotos: state.slideshowPhotos }),
      (key, value) => {
        if (key === 'slideshowPhotoId') {
          const slideshowPhotos = getSlideshowPhotos(store.getState());
          const currentSlideshowPhoto = getSlideshowPhoto({ ...store.getState(), slideshowPhotoId: value });
          if (currentSlideshowPhoto && slideshowPhotos && slideshowPhotos.length) {
            this.innerHTML = `${currentSlideshowPhoto.listIndex + 1} of ${slideshowPhotos.length}`;
          }
        }
      }
    );
  }

  disconnectedCallback() {
    if (this._storeUnsubscribe) {
      this._storeUnsubscribe();
    }
  }
}
