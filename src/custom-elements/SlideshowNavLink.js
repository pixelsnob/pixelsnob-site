

import store from '../store';
import { setSlideshowPhotoIdToPrevious, setSlideshowPhotoIdToNext, setSlideshowPhotoId } from '../actions';
import createObserver from '../createObserver';

export default class SlideshowNavLink extends HTMLElement {

  connectedCallback() {
    this.addEventListener('click', this.onClick.bind(this));
    this._storeUnsubscribe = createObserver(store)(
      state => ({ touchEnabled: state.touchEnabled }),
      (key, value) => {
        if (value && this.dataset.action !== 'close') {
          // Hide previous or next link if touch is enabled
          this.style.display = 'none';
        }
      }
    );
  }  

  onClick(ev) {
    ev.preventDefault();
    switch (this.dataset.action) {
      case 'previous':
        store.dispatch(setSlideshowPhotoIdToPrevious());
      break;
      case 'next':
        store.dispatch(setSlideshowPhotoIdToNext());
      break;
      case 'close':
        store.dispatch(setSlideshowPhotoId(null));
      break;
    }
  };

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick.bind(this));
    this._storeUnsubscribe();

  }

}