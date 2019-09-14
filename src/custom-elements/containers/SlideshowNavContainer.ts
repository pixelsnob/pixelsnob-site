

import { setCurrentSlideshowPhotoById, setSlideshowPhotoIdToNext, setSlideshowPhotoIdToPrevious } from '../../actions';
import { component } from '../../decorators';
import store from '../../store';
import SlideshowNavComponent from '../SlideshowNav';
import '../SlideshowNavLink';

@component('slideshow-nav-container')
export default class SlideshowNavContainer extends HTMLElement {
  
  public connectedCallback() {
    this.attachShadow({ mode: 'open' });

    const $slideshowNav = document.createElement('slideshow-nav') as SlideshowNavComponent;
    this.shadowRoot!.appendChild($slideshowNav);
    $slideshowNav.addEventListener('nav-action', this.handleAction.bind(this), true);
  }
  
  public disconnectedCallback() {
    const $slideshowNav = document.createElement('slideshow-nav') as SlideshowNavComponent;
    $slideshowNav.removeEventListener('nav-action', this.handleAction.bind(this), true);
  }
  
  private handleAction(ev: CustomEventInit) {

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

  private previous() {
    store.dispatch(setSlideshowPhotoIdToPrevious());
  };

  private next() {
    store.dispatch(setSlideshowPhotoIdToNext());
  };

  private close() {
    store.dispatch(setCurrentSlideshowPhotoById(null));
  };
}
