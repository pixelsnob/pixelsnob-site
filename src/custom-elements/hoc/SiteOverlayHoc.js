
import store from '../../store';
import createObserver from '../../createObserver';
import SiteOverlay from '../SiteOverlay.js';

customElements.define('site-overlay', SiteOverlay);

export default class SiteOverlayHoc extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const $siteOverlay = document.createElement('site-overlay');
    $siteOverlay.appendChild(this.querySelector('[slot="overlay-content"]'));
    this.shadowRoot.appendChild($siteOverlay);

    this._storeUnsubscribe = createObserver(store)(
      state => ({ overlayShow: state.overlayShow }),
      (key, value) => {
        if (key !== 'overlayShow') {
          return false;
        }
        if (value) {
          $siteOverlay.setAttribute('visible', '1');
          document.body.classList.add('no-scroll');
        } else {
          $siteOverlay.setAttribute('visible', '0');
          document.body.classList.remove('no-scroll');
        }
      }
    );
  }

  disconnectedCallback() {
    if (this._storeUnsubscribe) {
      this._storeUnsubscribe();
    }
  }
}
