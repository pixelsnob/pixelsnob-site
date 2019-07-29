

import store from '../store';
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
    this._previous = this.previous.bind(this);
    this._next = this.next.bind(this);
    this._close = this.close.bind(this);
  }

  connectedCallback() {
    this.innerHTML = tpl;
    this.querySelector('.previous a').addEventListener('click', this._previous);
    this.querySelector('.next a').addEventListener('click', this._next);
    this.querySelector('.close a').addEventListener('click', this._close);
    document.addEventListener('keydown', this.keydownHandler.bind(this));
  }  

  disconnectedCallback() {
    this.querySelector('.previous a').removeEventListener('click', this._previous);
    this.querySelector('.next a').removeEventListener('click', this._next);
    this.querySelector('.close a').removeEventListener('click', this._close);
    document.removeEventListener('keydown', this.keydownHandler.bind(this));
  }

  previous(evt) {
    store.dispatch(setSlideshowPhotoIdToPrevious());
  };

  next(evt) {
    store.dispatch(setSlideshowPhotoIdToNext());
  };

  close(evt) {
    store.dispatch(setSlideshowPhotoId(null));
  };

  keydownHandler(evt) {    
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
}