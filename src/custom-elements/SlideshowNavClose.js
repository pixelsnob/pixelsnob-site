

import store from '../store';
import { setSlideshowPhotoId } from '../actions';

export default class SlideshowNavClose extends HTMLElement {

  connectedCallback() {
    this.addEventListener('click', this.onClick.bind(this));
  }  

  onClick() {
    store.dispatch(setSlideshowPhotoId(null));
  };

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick.bind(this));

  }

}