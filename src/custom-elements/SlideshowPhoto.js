
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
    if (state.slideshowPhotoId && state.slideshowPhotoId === this.dataset.id) {
      this.show(state.slideshowPhotoId);
    } else {
      this.hide();
    }
  }

  show(id) {
    if (this.dataset.id === id) {
      const existingImg = this.querySelector('img');
      const tmpImg = new Image;
      tmpImg.src = this.dataset.backgroundImage;
      tmpImg.onload = (evt) => {
        existingImg.src = tmpImg.src;
      };
      existingImg.onload = (evt) => {
        this.classList.add('photo-visible');
      }
    } else {
      this.hide();
    }
  }

  hide() {
    this.classList.remove('photo-visible');
  }

}
