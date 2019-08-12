

import store from '../../store';
//import touch from '../touch';
import { setSlideshowPhotoId, setSlideshowPhotoIdToPrevious, setSlideshowPhotoIdToNext, enableTouch } from '../../actions';
import SlideshowNav from '../SlideshowNav.js';

customElements.define('slideshow-nav', SlideshowNav);


export default class SlideshowNavHoc extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });

    const $slideshowNav = document.createElement('slideshow-nav');
    
    $slideshowNav.appendChild(this.querySelector('[slot="nav-links"]'));
    this.shadowRoot.appendChild($slideshowNav);


  }  

  // previous() {
  //   store.dispatch(setSlideshowPhotoIdToPrevious());
  // };

  // next() {
  //   store.dispatch(setSlideshowPhotoIdToNext());
  // };

  // close() {
  //   store.dispatch(setSlideshowPhotoId(null));
  // };

  // keydown(evt) {    
  //   switch(evt.keyCode) {
  //     case 37:
  //     case 38:
  //       this.previous();
  //     break;
  //     case 39:
  //     case 40:
  //       this.next();
  //     break;
  //     case 27:
  //       this.close();
  //     break;
  //   }
  // }

  // ontouch(touchEventName) {
  //   store.dispatch(enableTouch());
  //   switch (touchEventName) {
  //     case 'left':
  //       this.next();
  //       break;
  //     case 'right':
  //       this.previous();
  //       break;
  //   }
  // }

  // disconnectedCallback() {
  //   document.removeEventListener('keydown', this.keydown.bind(this));
  //   this._removeTouch();
  // }

}