
import store from '../store';
import { setSlideshowPhotoId } from '../actions';

export default class PhotosListPhoto extends HTMLElement {

  constructor() {
    super();
    this._showPhoto = this.showPhoto.bind(this);
  }

  showPhoto(evt) {
    evt.preventDefault();
    store.dispatch(setSlideshowPhotoId(this.dataset.id));
  }

  connectedCallback() {
    this.addEventListener('click', this._showPhoto);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._showPhoto);
  }
}
