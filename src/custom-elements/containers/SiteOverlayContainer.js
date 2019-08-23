
import store from '../../store';
import createObserver from '../../createObserver';
import '../SiteOverlay';
import { customElementsDefine } from '../../customElements';


class SiteOverlayContainer extends HTMLElement {

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
          $siteOverlay.visible = { value: true };
          document.body.classList.add('no-scroll');
        } else {
          $siteOverlay.visible = { value: false };
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

customElementsDefine('site-overlay-container', SiteOverlayContainer);

export default SiteOverlayContainer;