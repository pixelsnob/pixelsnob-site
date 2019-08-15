

import store from '../../store';
import { setSlideshowPhotoId, setSlideshowPhotoIdToPrevious, setSlideshowPhotoIdToNext, enableTouch } from '../../actions';// enable touch?
import SlideshowNav from '../SlideshowNav.js';
import SlideshowNavLink from '../SlideshowNavLink';
import { customElementsDefineFromArray } from '../../customElements';

customElementsDefineFromArray([
  [ 'slideshow-nav', SlideshowNav ],
  [ 'slideshow-nav-link', SlideshowNavLink ]
]);

export default class SlideshowNavContainer extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const $slideshowNav = document.createElement('slideshow-nav');
    this.shadowRoot.appendChild($slideshowNav);
    $slideshowNav.addEventListener('nav-action', this._handleAction.bind(this), true);
  }
  
  disconnectedCallback() {
    $slideshowNav.removeEventListener('nav-action', this._handleAction.bind(this), true);
  }
  
  _handleAction(ev) {

    switch(ev.detail.action) {
      case 'previous':
        this.previous();
      break;
      case 'next':
        this.next();
      break;
      case 'close':
        this.close();
      break;
    }
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
}