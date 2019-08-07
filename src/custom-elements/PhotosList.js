
import store from '../store';

export default class PhotosListPhoto extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = '';
    store.getState().slideshowPhotos.forEach((photo, i) => {
      const $photo = document.createElement('photos-list-photo');
      $photo.setAttribute('data-id', photo.id);
      $photo.setAttribute('data-title', photo.title);
      $photo.setAttribute('data-src', photo.src_small);
      $photo.setAttribute('data-flickr-page-url', photo.flickr_page_url);

      $photo.className = 'photo aspect-ratio-box';
      this.appendChild($photo);
      
    });
    
  }

  disconnectedCallback() {
  }
}
