
import store from '../../store';
import createObserver from '../../createObserver';
import { customElementsDefine } from '../../customElements';

import { setSlideshowPhotoId } from '../../actions';
import { getSlideshowPhotos, getSlideshowPhotoByListIndex, getSlideshowPhoto } from '../../selectors';
import '../SlideshowProgress.js';
import '../SlideshowProgressStats';
import '../SlideshowProgressBar';

class SlideshowProgressContainer extends HTMLElement {

  connectedCallback() {
    
    this.attachShadow({ mode: 'open' });
    this._$progress = document.createElement('slideshow-progress');
    this.shadowRoot.appendChild(this._$progress);
    this._$progress.addEventListener('progress-update-photo-by-index', this._updatePhotoByIndex.bind(this));

    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotoId: state.slideshowPhotoId, slideshowPhotos: state.slideshowPhotos }),
      (key, value) => {
        this._updateProgress();
      }
    );
  }

  _updateProgress() {

    const state = store.getState();
    const slideshowPhoto = getSlideshowPhoto(state);
    const slideshowPhotos = getSlideshowPhotos(state);

    let listIndex = 0;

    if (slideshowPhoto) {
      listIndex = slideshowPhoto.listIndex;
      
    }
    this._$progress.setAttribute('current-index', listIndex);
    this._$progress.setAttribute('list-length', slideshowPhotos.length);
  }

  _updatePhotoByIndex(ev) {
    ev.preventDefault();
    const slideshowPhotos = getSlideshowPhotos(store.getState());
    if (slideshowPhotos && ev.detail.photoListIndex) {
      const photo = getSlideshowPhotoByListIndex({ ...store.getState(), listIndex: ev.detail.photoListIndex });
      if (photo) {
        store.dispatch(setSlideshowPhotoId(photo.id));
      }
    }
  }

  disconnectedCallback() {
    this._$progress.removeEventListener('progress-update-photo-by-index', this._updatePhotoByIndex.bind(this));
    this._$progress.removeEventListener('click', this._onClick.bind(this));
  }
}

customElementsDefine('slideshow-progress-container', SlideshowProgressContainer);

export default SlideshowProgressContainer;

