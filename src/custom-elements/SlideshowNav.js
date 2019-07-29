

import store from '../store';
import { setSlideshowPhotoId } from '../actions';

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
    console.log('hide')
    //store.dispatch(setSlideshowPhotoId(null));
  }

  previousOnclick(evt) {
    document.dispatchEvent(new CustomEvent('slideshow-photos-show-previous'));
  };

  nextOnclick(evt) {
    document.dispatchEvent(new CustomEvent('slideshow-photos-show-next'));
  };

  closeOnclick(evt) {
    store.dispatch(setSlideshowPhotoId(null));
  };
}