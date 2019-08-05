

import store from '../store';
import { setSlideshowPhotoIdToNext } from '../actions';
import createObserver from '../createObserver';

export default class SlideshowNavNext extends HTMLElement {

  connectedCallback() {
    this.addEventListener('click', this.onClick.bind(this));
    this._storeUnsubscribe = createObserver(store)(
      state => ({ touchEnabled: state.touchEnabled }),
      (key, value) => {
        if (value) {
          this.style.display = 'none';
        }
      }
    );
  }  

  onClick() {
    store.dispatch(setSlideshowPhotoIdToNext());
  };

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick.bind(this));
    this._storeUnsubscribe();
  }

}