
import store from '../store';
import createObserver from '../createObserver';

export default class SiteOverlay extends HTMLElement {

  connectedCallback() {
    this._storeUnsubscribe = createObserver(store)(
      state => ({ overlayShow: state.overlayShow }),
      (overlayShow) => {
        if (overlayShow) {
          this.classList.add('site-overlay-visible');
        } else {
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
