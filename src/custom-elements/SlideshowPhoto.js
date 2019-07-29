
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
      if (existingImg) {
        this.classList.add('photo-visible');
        return null;
      }
      const img = new Image();

      img.addEventListener('load', (evt) => {
        this.appendChild(img);
        this.classList.add('photo-visible');
      });
      img.src = this.dataset.backgroundImage;
    } else {
      this.hide();
    }
  }

  hide() {
    this.classList.remove('photo-visible');
  }

}
