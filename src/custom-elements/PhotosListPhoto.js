
import store from '../store';
import { setSlideshowPhotoId } from '../actions';

const tpl = (photo) => `
<span>
  <img alt="${photo.title}" data-src="${photo.src}" class="lazy-load"/>
</span>
`;

export default class PhotosListPhoto extends HTMLElement {

  constructor() {
    super();
    this._showPhoto = this.showPhoto.bind(this);
    
  }

  connectedCallback() {
    this.innerHTML = tpl(this.dataset);
    this.addEventListener('click', this._showPhoto);
  }

  showPhoto(evt) {
    evt.preventDefault();
    store.dispatch(setSlideshowPhotoId(this.dataset.id));
  }


  disconnectedCallback() {
    this.removeEventListener('click', this._showPhoto);
  }
}
