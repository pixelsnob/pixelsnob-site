
import store from '../../store';
import createObserver from '../../createObserver'
import { customElementsDefine } from '../../customElements';
import '../PhotosListNav.js';

import { setCurrentSlideshowPhotoById } from '../../actions';

class PhotosListNavContainer extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._$photosListNav = document.createElement('photos-list-nav');
    this.shadowRoot.appendChild(this._$photosListNav);
    
    this._$photosListNav.addEventListener('photos-list-photo-change', this._onPhotoChange.bind(this), true);

    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotos: state.slideshowPhotos/* , slideshowPhotoId: state.slideshowPhotoId */ }),
      (key, value) => {
        if (key === 'slideshowPhotos') {
          this._$photosListNav.photos = value;
        // } else if (key === 'slideshowPhotoId') {
        //   this._$photosListNav.currentPhotoId = value;
        }
      }
    );
  }

  _onPhotoChange(ev) {
    store.dispatch(setCurrentSlideshowPhotoById(ev.detail.id));

  }

  disconnectedCallback() {
    this._$photosListNav.removeEventListener('photos-list-photo-change', this._onPhotoChange.bind(this), true);
      this._storeUnsubscribe();
  }
}

customElementsDefine('photos-list-nav-container', PhotosListNavContainer);

export default PhotosListNavContainer;