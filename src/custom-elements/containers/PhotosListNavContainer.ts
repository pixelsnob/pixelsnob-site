import { setCurrentSlideshowPhotoById } from '../../actions';
import createObserver from '../../createObserver'
import { component } from '../../decorators';
import store from '../../store';
import PhotosListNavComponent from '../PhotosListNav'

@component('photos-list-nav-container')
export default class PhotosListNavContainer extends HTMLElement {

  private photosStoreUnsubscribe?: () => void;
  private currentPhotoStoreUnsubscribe?: () => void;

  private $photosListNav?: PhotosListNavComponent;

  public connectedCallback() {
    this.attachShadow({ mode: 'open' });

    this.$photosListNav = document.createElement('photos-list-nav') as PhotosListNavComponent;
    this.shadowRoot!.appendChild(this.$photosListNav);
    
    this.$photosListNav.addEventListener('photos-list-photo-change', this.onPhotoChange.bind(this), true);

    this.photosStoreUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotos: state.slideshowPhotos }),
      (state) => {
        this.$photosListNav!.photos = state.slideshowPhotos;
      }
    );

    this.currentPhotoStoreUnsubscribe = createObserver(store)(
      state => ({ currentSlideshowPhoto: state.currentSlideshowPhoto }),
      (state) => {
        this.$photosListNav!.currentPhoto = state.currentSlideshowPhoto;
      }
    );
  }

  public disconnectedCallback() {
    this.$photosListNav!.removeEventListener('photos-list-photo-change', this.onPhotoChange.bind(this), true);
    if (this.photosStoreUnsubscribe) {
      this.photosStoreUnsubscribe();
    }
    if (this.currentPhotoStoreUnsubscribe) {
      this.currentPhotoStoreUnsubscribe();
    }
  }

  private onPhotoChange(ev: CustomEventInit) {
    store.dispatch(setCurrentSlideshowPhotoById(ev.detail.id));

  }

}
