
import store from '../../store';
import { setSlideshowPhotoId } from '../../actions';
import PhotosListPhoto from '../PhotosListPhoto.js';
import { getSlideshowPhoto } from '../../selectors';

customElements.define('photos-list-photo', PhotosListPhoto);

export default class PhotosListPhotoHoc extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const photo = getSlideshowPhoto({ ...store.getState(), slideshowPhotoId: this.dataset.id });
    if (!photo) {
      return null;
    }
    const $photo = document.createElement('photos-list-photo');
    $photo.photo = photo;
    $photo.addEventListener('click', this._onClick.bind(this));
    this.shadowRoot.appendChild($photo);
  }

  _onClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    store.dispatch(setSlideshowPhotoId(this.dataset.id));
  }

  disconnectedCallback() {
    $photo.removeEventListener('click', this._onClick.bind(this));
  }
}
