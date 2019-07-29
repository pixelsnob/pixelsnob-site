
import store from '../store';

export default class SlideshowPhoto extends HTMLElement {

  connectedCallback() {
    const state = store.getState();
    if (state.slideshowPhotoId && state.slideshowPhotoId === this.dataset.id) {
      this.showPhotoById(state.slideshowPhotoId);
    }
  }

  disconnectedCallback() {
    //document.removeEventListener('slideshow-photo-show', this.showPhoto.bind(this));
    //document.removeEventListener('slideshow-photo-hide', this.hidePhoto.bind(this));
    this.classList.remove('photo-visible');
  }

  showPhotoById(id) {
    if (this.dataset.id === id) {
      console.log('?????  ')
      //this.classList.add('photo-visible');
      // if (existingImg) {
      //   this.appendChild(existingImg);
      // } else {
      //   const img = new Image;
      //   img.src = this.dataset.backgroundImage;
      //   img.className = 'img-hidden';
      //   img.onload = function(evt) {
      //     img.className = 'img-active';
      //   };
      //   this.appendChild(img);
      // }
    } else {
      //setTimeout((evt) => {
        //this.hidePhoto();

      //}, 800)
    }
  }

  hidePhoto(evt) {
    const img = this.querySelector('img');
    this.classList.remove('photo-visible');
    if (img) {
      img.remove();
    }
  }

}
