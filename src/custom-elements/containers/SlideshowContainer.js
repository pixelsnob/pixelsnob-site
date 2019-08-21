import store from '../../store';
import createObserver from '../../createObserver';
import { customElementsDefineFromArray } from '../../customElements';

import { getSlideshowPhotos } from '../../selectors';
import SlideshowLayout from '../SlideshowLayout';

import SlideshowPhotos from '../SlideshowPhotos';
import SlideshowPhoto from '../SlideshowPhoto';
import SlideshowProgressContainer from './SlideshowProgressContainer';
import PhotosListNavContainer from './PhotosListNavContainer';
import debounce from 'lodash.debounce';

customElementsDefineFromArray([
  [ 'slideshow-layout', SlideshowLayout ],
  [ 'slideshow-photos', SlideshowPhotos ],
  [ 'slideshow-photo', SlideshowPhoto ],//
  [ 'slideshow-progress-container', SlideshowProgressContainer ],
  [ 'photos-list-nav-container', PhotosListNavContainer ],
]);


const template = document.createElement('template');
template.innerHTML = `
<slideshow-layout>
  <slideshow-photos slot="slideshow-photos"></slideshow-photos>
  <slideshow-progress-container slot="slideshow-progress-container"></slideshow-progress-container>
  <slideshow-nav-container slot="slideshow-nav-container"></slideshow-nav-container>
  <photos-list-nav-container slot="photos-list-nav"></photos-list-nav-container>
</slideshow-layout>
`;

export default class SlideshowContainer extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotos: state.slideshowPhotos, slideshowPhotoId: state.slideshowPhotoId }),
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