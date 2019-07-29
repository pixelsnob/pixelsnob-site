
import store from '../store';
import { setSlideshowPhotoId } from '../actions';

export default class PhotosListPhoto extends HTMLElement {

  constructor() {
    super();
  }

  showPhoto(evt) {
    evt.preventDefault();
    store.dispatch(setSlideshowPhotoId(this.dataset.id));
  }

  connectedCallback() {
    this.addEventListener('click', this.showPhoto.bind(this));
  }

  discconnectedCallback() {
    this.removeEventListener('click', this.showPhoto.bind(this));

  }
}
