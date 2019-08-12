

import store from '../../store';
import { setSlideshowPhotoIdToPrevious, setSlideshowPhotoIdToNext, setSlideshowPhotoId } from '../../actions';
//import createObserver from '../createObserver';
import SlideshowNavLink from '../SlideshowNavLink.js';

customElements.define('slideshow-nav-link', SlideshowNavLink);

export default class SlideshowNavLinkHoc extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._$navLink = document.createElement('slideshow-nav-link');
    const $slot = this.querySelector('[slot="nav-link"]');
    this._$navLink.appendChild($slot);

    this._$navLink.action = this.dataset.action;
    this.shadowRoot.appendChild(this._$navLink);
    this._$navLink.shadowRoot.addEventListener('nav-link-click', this._handleAction.bind(this));

    // this.shadowRoot.appendChild(template.content.cloneNode(true));
    // this.addEventListener('click', this.onClick.bind(this));
    // this._storeUnsubscribe = createObserver(store)(
    //   state => ({ touchEnabled: state.touchEnabled }),
    //   (key, value) => {
    //     if (value && this.dataset.action !== 'close') {
    //       // Hide previous and next link if touch is enabled
    //       this.style.display = 'none';
    //     }
    //   }
    // );
  }  

  _handleAction(ev) {
    ev.preventDefault();
    switch (ev.detail.action) {
      case 'previous':
        store.dispatch(setSlideshowPhotoIdToPrevious());
      break;
      case 'next':
        store.dispatch(setSlideshowPhotoIdToNext());
      break;
      case 'close':
        store.dispatch(setSlideshowPhotoId(null));
      break;
    }
  };

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick.bind(this));
    this._storeUnsubscribe();
    this._$navLink.shadowRoot.removeEventListener('nav-link-click', this._handleAction.bind(this));
  }

}