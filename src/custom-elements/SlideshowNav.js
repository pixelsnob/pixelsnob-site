

import store from '../store';
import touch from '../touch';

import { setSlideshowPhotoId, setSlideshowPhotoIdToPrevious, setSlideshowPhotoIdToNext, enableTouch } from '../actions';

export default class SlideshowNav extends HTMLElement {

  connectedCallback() {
    this._removeTouch = touch(document, this.ontouch.bind(this));
    document.addEventListener('keydown', this.keydown.bind(this));
  }  

  previous() {
    store.dispatch(setSlideshowPhotoIdToPrevious());
  };

  next() {
    store.dispatch(setSlideshowPhotoIdToNext());
  };

  close() {
    store.dispatch(setSlideshowPhotoId(null));
  };

  keydown(evt) {    
    switch(evt.keyCode) {
      case 37:
      case 38:
        this.previous();
      break;
      case 39:
      case 40:
        this.next();
      break;
      case 27:
        this.close();
      break;
    }
  }

  ontouch(touchEventName) {
    store.dispatch(enableTouch());
    switch (touchEventName) {
      case 'left':
        this.next();
        break;
      case 'right':
        this.previous();
        break;
    }
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.keydown.bind(this));
    this._removeTouch();
  }

}