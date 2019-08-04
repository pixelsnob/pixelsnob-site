
import store from '../store';
import createObserver from '../createObserver';

export default class SiteOverlay extends HTMLElement {

  connectedCallback() {
    this._storeUnsubscribe = createObserver(store)(
      state => ({ overlayShow: state.overlayShow }),
      (key, value) => {
        if (key !== 'overlayShow') {
          return false;
        }
        if (value) {
          this.classList.add('site-overlay-visible');
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
          this.classList.remove('site-overlay-visible');
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
