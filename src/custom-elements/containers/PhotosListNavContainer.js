
import store from '../../store';
import createObserver from '../../createObserver'
import { customElementsDefineFromArray } from '../../customElements';
import PhotosListNav from '../PhotosListNav.js';

import { setSlideshowPhotoId } from '../../actions';

customElementsDefineFromArray([
  [ 'photos-list-nav', PhotosListNav ]
]);

export default class PhotosListContainer extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._$photosListNav = document.createElement('photos-list-nav');
    this.shadowRoot.appendChild(this._$photosListNav);
    
    this._$photosListNav.addEventListener('photos-list-photo-change', this._onPhotoChange.bind(this), true);

    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotos: state.slideshowPhotos, slideshowPhotoId: state.slideshowPhotoId }),
      (key, value) => {
        if (key === 'slideshowPhotos') {
          this._$photosListNav.photos = value;
        } else if (key === 'slideshowPhotoId') {
          this._$photosListNav.currentPhotoId = value;
        }
      }
    );
  }

  _onPhotoChange(ev) {
    store.dispatch(setSlideshowPhotoId(ev.detail.id));

  }

  disconnectedCallback() {
    this._$photosListNav.removeEventListener('photos-list-photo-change', this._onPhotoChange.bind(this), true);
      this._storeUnsubscribe();
  }
}
