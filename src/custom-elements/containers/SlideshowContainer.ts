import debounce from 'lodash.debounce';
import createObserver from '../../createObserver';
import { component } from '../../decorators';
import { getSlideshowPhotos } from '../../selectors';
import store from '../../store';
import SlideshowPhotosComponent from '../SlideshowPhotos';

const template = document.createElement('template');
template.innerHTML = `
<slideshow-layout>
  <slideshow-photos slot="slideshow-photos"></slideshow-photos>
  <slideshow-progress-container slot="slideshow-progress-container"></slideshow-progress-container>
  <slideshow-nav-container slot="slideshow-nav-container"></slideshow-nav-container>
  <photos-list-nav-container slot="photos-list-nav"></photos-list-nav-container>
</slideshow-layout>
`;

@component('slideshow-container', template)
export default class SlideshowContainer extends HTMLElement {

  private storeSlideshowPhotosUnsubscribe?: () => void;
  private storeSlideshowPhotoIdUnsubscribe?: () => void;
  
  public connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    this.storeSlideshowPhotosUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotos: state.slideshowPhotos }),
      debounce(this.onSlideshowPhotosStateChange.bind(this), 60, { leading: true })
    );
    this.storeSlideshowPhotoIdUnsubscribe = createObserver(store)(
      state => ({ currentSlideshowPhoto: state.currentSlideshowPhoto }),
      debounce(this.onSlideshowPhotoIdStateChange.bind(this), 60, { leading: true })
    );
  }

  public disconnectedCallback() {
    if (this.storeSlideshowPhotoIdUnsubscribe) {
      this.storeSlideshowPhotoIdUnsubscribe();
    }
    if (this.storeSlideshowPhotosUnsubscribe) {
      this.storeSlideshowPhotosUnsubscribe();
    }
  }

  private onSlideshowPhotosStateChange(state: State) {
    const $slideshowPhotos = this.shadowRoot!.querySelector('slideshow-photos') as SlideshowPhotosComponent;
    if (!$slideshowPhotos) {
      return null;
    }
    const photos: SlideshowPhoto[] = getSlideshowPhotos(state);
    $slideshowPhotos.photos = photos;
  }

  private onSlideshowPhotoIdStateChange(state: State) {
    const $slideshowPhotos = this.shadowRoot!.querySelector('slideshow-photos') as SlideshowPhotosComponent;
    if (!$slideshowPhotos) {
      return null;
    }
    $slideshowPhotos.currentPhoto = state.currentSlideshowPhoto;
  }

}

