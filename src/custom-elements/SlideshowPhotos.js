import store from '../store';
import { getSlideshowPhotos } from '../selectors';

export default class SlideshowPhotos extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const photos = getSlideshowPhotos(store.getState());
    photos.forEach((photo, i) => {
      const $photo = document.createElement('slideshow-photo');
      this.appendChild($photo);
      $photo.setAttribute('data-id', photo.id);
    });
  }
}