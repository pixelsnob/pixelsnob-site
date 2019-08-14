
import store from '../../store';
import PhotosList from '../PhotosList.js';
import { setSlideshowPhotoId } from '../../actions';

customElements.define('photos-list', PhotosList);

export default class PhotosListHoc extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const $photosList = document.createElement('photos-list');
    this.shadowRoot.appendChild($photosList);
    $photosList.photos = store.getState().slideshowPhotos;
    $photosList.shadowRoot.addEventListener('photos-list-photo-click', ev => {
      store.dispatch(setSlideshowPhotoId(ev.detail.id));
    }, true);
  }
}
