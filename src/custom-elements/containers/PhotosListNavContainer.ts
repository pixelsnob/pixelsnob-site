import createObserver from '../../createObserver'
import { component } from '../../decorators';
import PhotosListNavComponent from '../PhotosListNav'

import { setCurrentSlideshowPhotoById } from '../../actions';
import store from '../../store';

@component('photos-list-nav-container')
export default class PhotosListNavContainer extends HTMLElement {

  private storeUnsubscribe?: () => void;
  private $photosListNav?: PhotosListNavComponent;

  public connectedCallback() {
    this.attachShadow({ mode: 'open' });

    this.$photosListNav = document.createElement('photos-list-nav') as PhotosListNavComponent;
    this.shadowRoot!.appendChild(this.$photosListNav);
    
    this.$photosListNav.addEventListener('photos-list-photo-change', this.onPhotoChange.bind(this), true);

    this.storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotos: state.slideshowPhotos }),
      (state) => {
        this.$photosListNav!.photos = state.slideshowPhotos;
      }
    );
  }

  public disconnectedCallback() {
    this.$photosListNav!.removeEventListener('photos-list-photo-change', this.onPhotoChange.bind(this), true);
    if (this.storeUnsubscribe) {
      this.storeUnsubscribe();
    }
  }

  private onPhotoChange(ev: CustomEventInit) {
    store.dispatch(setCurrentSlideshowPhotoById(ev.detail.id));

  }

}
