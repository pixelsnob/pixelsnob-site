import createObserver from '../../createObserver';
import { component } from '../../decorators';

import { hideOverlay, showOverlay } from '../../actions';
import store from '../../store';

@component('slideshow-overlay-connector-container')

class SlideshowOverlayConnectorContainer extends HTMLElement {

  private storeUnsubscribe?: () => void;

  public connectedCallback() {
    this.storeUnsubscribe = createObserver(store)(
      (state) => ({ currentSlideshowPhoto: state.currentSlideshowPhoto }),
      (state) => {
        if (state.currentSlideshowPhoto) {
          store.dispatch(showOverlay());
        } else {
          store.dispatch(hideOverlay());
        }
      }
    );
  }

  public disconnectedCallback() {
    if (typeof this.storeUnsubscribe === 'function') {
      this.storeUnsubscribe();
    }
  }
}

export default SlideshowOverlayConnectorContainer;