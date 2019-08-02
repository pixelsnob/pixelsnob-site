
import store from '../store';
//import lazyLoadImages from '../lazyLoadImages';
//import { setSlideshowPhotoId } from '../actions';

export default class PhotosListPhoto extends HTMLElement {

  constructor() {
    super();
    //this.className = 'photo aspect-ratio-box';
  }

  connectedCallback() {
    store.getState().slideshowPhotos.forEach((photo, i) => {
      const $photo = document.createElement('photos-list-photo');
      //$photo.className = 'photo aspect-ratio-box';
      $photo.setAttribute('data-id', photo.id);
      $photo.setAttribute('data-title', photo.title);
      $photo.setAttribute('data-src', photo.thumbnail);
      $photo.className = 'photo aspect-ratio-box';
      this.appendChild($photo);
      
    });
  }

  disconnectedCallback() {
  }
}
