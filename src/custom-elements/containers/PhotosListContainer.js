
import store from '../../store';
import createObserver from '../../createObserver'
import { customElementsDefine } from '../../customElements';
import '../PhotosList';
import '../PhotosListPhoto';

import { setCurrentSlideshowPhotoById } from '../../actions';

class PhotosListContainer extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const $photosList = document.createElement('photos-list');
    this.shadowRoot.appendChild($photosList);
    $photosList.photos = store.getState().slideshowPhotos;
    $photosList.shadowRoot.addEventListener('photos-list-photo-click', this._onPhotoSelect.bind(this), true);
    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotos: state.slideshowPhotos }),
      (state) => {
        $photosList.photos = state.slideshowPhotos;
      }
    );
  }

  _onPhotoSelect(ev) {
    store.dispatch(setCurrentSlideshowPhotoById(ev.detail.id));
  }

  disconnectedCallback() {
    const $photosList = document.createElement('photos-list');
    $photosList.shadowRoot.removeEventListener('photos-list-photo-click', this._onPhotoSelect.bind(this), true);
    this._storeUnsubscribe();
  }
}

customElementsDefine('photos-list-container', PhotosListContainer);

export default PhotosListContainer;

