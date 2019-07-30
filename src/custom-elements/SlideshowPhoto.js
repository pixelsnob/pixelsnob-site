
import store from '../store';

export default class SlideshowPhoto extends HTMLElement {

  connectedCallback() {
    this.update();
    this._storeUnsubscribe = store.subscribe(() => {
      this.update();
    });
  }

  disconnectedCallback() {
    this.classList.remove('photo-visible');
    this._storeUnsubscribe();
  }

  update() {
    const state = store.getState();
    if (state.slideshowPhotoId) {
      this.show(state.slideshowPhotoId);
    } else {
      this.hide();
    }
  }

  show(id) {
    if (this.dataset.id === id) {
      const existingImg = this.querySelector('img');
      const tmpImg = new Image;
      tmpImg.onload = evt => {
        const state = store.getState();
        if (state.slideshowPhotoId === id) {
          this.className = 'photo-visible';
        }
      };
      tmpImg.src = existingImg.dataset.src;
      existingImg.src = tmpImg.src;
    } else {
      this.className = '';
    }
  }

  hide() {
    this.className = '';
  }

}
