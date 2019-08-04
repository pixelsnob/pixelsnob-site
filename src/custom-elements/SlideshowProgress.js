
import store from '../store';
import createObserver from '../createObserver';

export default class SlideshowProgress extends HTMLElement {

  constructor() {
    super();
    
  }
  connectedCallback() {
    this.innerHTML = '<progress/>';
    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotoId: state.slideshowPhotoId, slideshowPhotos: state.slideshowPhotos }),
      (key, value) => {
        const $progress = this.querySelector('progress');
        $progress.max = 0;
        $progress.value = 0;
        if (key === 'slideshowPhotoId' && value) {

          const slideshowPhotos = store.getState().slideshowPhotos;
          if (slideshowPhotos.length) {
            const photo = slideshowPhotos.find(photo => photo.id === value);
            const $progress = this.querySelector('progress');
            $progress.max = slideshowPhotos.length - 1;
            $progress.value = photo.listIndex;
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
