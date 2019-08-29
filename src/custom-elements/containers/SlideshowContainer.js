import store from '../../store';
import createObserver from '../../createObserver';
import { customElementsDefine } from '../../customElements';
import { getSlideshowPhotos } from '../../selectors';

import '../SlideshowLayout';
import '../SlideshowPhotos';
import '../SlideshowPhoto';
import './SlideshowProgressContainer';
import './PhotosListNavContainer';
import './SlideshowNavContainer';

import debounce from 'lodash.debounce';

const template = document.createElement('template');
template.innerHTML = `
<slideshow-layout>
  <slideshow-photos slot="slideshow-photos"></slideshow-photos>
  <slideshow-progress-container slot="slideshow-progress-container"></slideshow-progress-container>
  <slideshow-nav-container slot="slideshow-nav-container"></slideshow-nav-container>
  <photos-list-nav-container slot="photos-list-nav"></photos-list-nav-container>
</slideshow-layout>
`;

class SlideshowContainer extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotos: state.slideshowPhotos/* , slideshowPhotoId: state.slideshowPhotoId */ }),
      debounce(this._onSlideshowStateChange.bind(this), 60, { leading: true })
    );
  }

  disconnectedCallback() {
    this._storeUnsubscribe();
  }

  _onSlideshowStateChange(key, value) {
    
    const state = store.getState();
    const $slideshowPhotos = this.shadowRoot.querySelector('slideshow-photos');
    switch (key) {
      case 'slideshowPhotos': {
        const photos = getSlideshowPhotos(state);
        $slideshowPhotos.photos = photos;
        break;
      }
      case 'slideshowPhotoId': {
        $slideshowPhotos.currentPhotoId = value;
        break;
      }
    }
  }

}

customElementsDefine('slideshow-container', SlideshowContainer, template);

export default SlideshowContainer;