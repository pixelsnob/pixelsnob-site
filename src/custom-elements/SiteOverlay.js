
import store from '../store';

//import { setOverlayTemplateId } from '../actions';

export default class SiteOverlay extends HTMLElement {

  connectedCallback() {
    store.subscribe(() => {
      const state = store.getState();
      if (state.overlayShow) {
        this.classList.add('site-overlay-visible');
      } else {
        this.classList.remove('site-overlay-visible');
      }
    });
  }

  disconnectedCallback() {
    if (this._storeUnsubscribe) {
      this._storeUnsubscribe();
    }
  }
}
