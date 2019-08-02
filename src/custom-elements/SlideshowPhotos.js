import store from '../store';

export default class SlideshowPhotos extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const photos = store.getState().slideshowPhotos;
    photos.forEach((photo, i) => {
      const $photo = document.createElement('slideshow-photo');
      this.appendChild($photo);
      $photo.setAttribute('data-id', photo.id);
    });
  }
}