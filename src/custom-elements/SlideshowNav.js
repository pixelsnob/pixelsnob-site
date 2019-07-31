

import store from '../store';
import touch from '../touch';


import { setSlideshowPhotoId, setSlideshowPhotoIdToPrevious, setSlideshowPhotoIdToNext } from '../actions';

const tpl = `
<ul class="photos-slideshow-nav">
  <li class="previous"><a>&#x2190;</a></li>
  <li class="close"><a>&times;</a></li>
  <li class="next"><a>&#x2192;</a></li>
</ul>
`;

export default class SlideshowNav extends HTMLElement {

  constructor() {
    super();
    this.innerHTML = tpl;
    this._previous = this.previous.bind(this);
    this._next = this.next.bind(this);
    this._close = this.close.bind(this);
    this._keydown = this.keydown.bind(this);
    this._previousLink = this.querySelector('.previous a');
    this._nextLink = this.querySelector('.next a');
    this._closeLink = this.querySelector('.close a');
    this._removeTouch = touch(document, this.ontouch.bind(this)); //maybe use more specific element...
  }

  connectedCallback() {
    this._previousLink.addEventListener('click', this._previous);
    this._nextLink.addEventListener('click', this._next);
    this._closeLink.addEventListener('click', this._close);
    document.addEventListener('keydown', this._keydown);

  }  

  disconnectedCallback() {
    this.querySelector('.previous a').removeEventListener('click', this._previous);
    this.querySelector('.next a').removeEventListener('click', this._next);
    this.querySelector('.close a').removeEventListener('click', this._close);
    document.removeEventListener('keydown', this._keydown);
    this._removeTouch();
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
    console.log(touchEventName)
    switch (touchEventName) {
      case 'left':
        this.previous();
        break;
      case 'right':
        this.next();
        break;
      case 'up':
      case 'down':
        setTimeout(() => {
          this.close();
        }, 300);
        
        break;
    }
  }
}