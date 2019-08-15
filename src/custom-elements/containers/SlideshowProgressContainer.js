
import store from '../../store';
import createObserver from '../../createObserver';
import { customElementsDefineFromArray } from '../../customElements';

import { setSlideshowPhotoId } from '../../actions';
import { getSlideshowPhotos, getSlideshowPhotoByListIndex, getSlideshowPhoto } from '../../selectors';
import SlideshowProgress from '../SlideshowProgress.js';
import SlideshowProgressStats from '../SlideshowProgressStats';
import SlideshowProgressBar from '../SlideshowProgressBar';

customElementsDefineFromArray([
  [ 'slideshow-progress', SlideshowProgress ],
  [ 'slideshow-progress-stats', SlideshowProgressStats ],
  [ 'slideshow-progress-bar', SlideshowProgressBar ]
]);

export default class SlideshowProgressContainer extends HTMLElement {

  connectedCallback() {
    
    this.attachShadow({ mode: 'open' });
    this._$progress = document.createElement('slideshow-progress');
    
    this.shadowRoot.addEventListener('click', this._onClick.bind(this));

    this.shadowRoot.appendChild(this._$progress);
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

  _onClick(ev) {
    ev.preventDefault();
    const slideshowPhotos = getSlideshowPhotos(store.getState());
    if (slideshowPhotos) {
      // Load a photo by list index, based on where the progress bar was clicked.
      const listIndex = Math.ceil((ev.clientX / window.innerWidth) * (slideshowPhotos.length - 1));
      const photo = getSlideshowPhotoByListIndex({ ...store.getState(), listIndex });

      if (photo) {
        store.dispatch(setSlideshowPhotoId(photo.id));

      }
    }
  }

  disconnectedCallback() {
    this._$progress.removeEventListener('click', this._onClick.bind(this));
  }
}
