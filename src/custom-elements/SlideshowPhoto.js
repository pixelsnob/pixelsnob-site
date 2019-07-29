
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
      if (existingImg.src !== this.dataset.backgroundImage) {
        existingImg.onload = evt => {
          const state = store.getState();
          if (state.slideshowPhotoId === this.dataset.id) {
            this.className = 'photo-visible';
          }
        };
        existingImg.src = this.dataset.backgroundImage;// use lower res that are already loaded!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      } else {
        this.className = 'photo-visible';
      }
    } else {
      this.className = ''
    }
  }

  hide() {
    this.className = '';
    //this.classList.remove('photo-visible');
  }

}
