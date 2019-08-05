

import store from '../store';
import { setSlideshowPhotoIdToPrevious } from '../actions';
import createObserver from '../createObserver';

export default class SlideshowNavPrevious extends HTMLElement {

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
    store.dispatch(setSlideshowPhotoIdToPrevious());
  };

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick.bind(this));
    this._storeUnsubscribe();

  }

}