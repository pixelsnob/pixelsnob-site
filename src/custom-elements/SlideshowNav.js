

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
    this._previousOnclick = this.previousOnclick.bind(this);
    this._nextOnclick = this.nextOnclick.bind(this);
    this._closeOnclick = this.closeOnclick.bind(this);

  }

  connectedCallback() {
    this.innerHTML = tpl;
    this.querySelector('.previous a').addEventListener('click', this._previousOnclick);
    this.querySelector('.next a').addEventListener('click', this._nextOnclick);
    this.querySelector('.close a').addEventListener('click', this._closeOnclick);

    //document.addEventListener('touch-swiped', this.show.bind(this));
    //document.addEventListener('click', this.hide.bind(this));
  }  

  disconnectedCallback() {
    this.querySelector('.previous a').removeEventListener('click', this._previousOnclick);
    this.querySelector('.next a').removeEventListener('click', this._nextOnclick);
    this.querySelector('.close a').removeEventListener('click', this._closeOnclick);
  }  

  show(evt) {
    this.classList.add('photos-slideshow-nav-container-hidden');
  }

  hide(evt) {
    //////////////////
  }

  previousOnclick(evt) {
    store.dispatch(setSlideshowPhotoIdToPrevious());
  };

  nextOnclick(evt) {
    store.dispatch(setSlideshowPhotoIdToNext());
  };

  closeOnclick(evt) {
    store.dispatch(setSlideshowPhotoId(null));
  };
}