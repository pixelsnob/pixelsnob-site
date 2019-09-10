
import createObserver from '../../createObserver';
import { component } from '../../decorators';

import store from '../../store';
import SiteOverlayComponent from '../SiteOverlay';

@component('site-overlay-container')
export default class SiteOverlayContainer extends HTMLElement {

  private storeUnsubscribe!: () => void;

  public connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const $siteOverlay = document.createElement('site-overlay') as SiteOverlayComponent;
    const $overlayContentSlot = this.querySelector('[slot="overlay-content"]') as Node;

    $siteOverlay.appendChild($overlayContentSlot);
    this.shadowRoot!.appendChild($siteOverlay);

    this.storeUnsubscribe = createObserver(store)(
      state => ({ showOverlay: state.showOverlay }),
      (state) => {
        if (state.showOverlay) {
          $siteOverlay.visible = true;
          document.body.classList.add('no-scroll');
        } else {
          $siteOverlay.visible = false;
          document.body.classList.remove('no-scroll');
        }
      }
    );
  }

  public disconnectedCallback() {
    if (this.storeUnsubscribe) {
      this.storeUnsubscribe();
    }
  }
}

