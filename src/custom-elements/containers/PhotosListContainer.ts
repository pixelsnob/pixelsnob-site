
import { setCurrentSlideshowPhotoById } from '../../actions';
import createObserver from '../../createObserver'
import { component } from '../../decorators';
import store from '../../store';
import PhotosListComponent from '../PhotosList';

@component('photos-list-container')
export default class PhotosListContainer extends HTMLElement {

  private storeUnsubscribe?: () => void;

  public connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const $photosList = document.createElement('photos-list') as PhotosListComponent;
    this.shadowRoot!.appendChild($photosList);

    $photosList.photos = store.getState().slideshowPhotos;
    $photosList.shadowRoot!.addEventListener('photos-list-photo-click', this.onPhotoSelect.bind(this), true);
    
    this.storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotos: state.slideshowPhotos }),
      (state) => {
        $photosList.photos = state.slideshowPhotos;
      }
    );
  }

  public disconnectedCallback() {
    const $photosList = document.createElement('photos-list');
    $photosList.shadowRoot!.removeEventListener('photos-list-photo-click', this.onPhotoSelect.bind(this), true);
    if (this.storeUnsubscribe) {
      this.storeUnsubscribe();

    }
  }

  private onPhotoSelect(ev: CustomEventInit) {
    store.dispatch(setCurrentSlideshowPhotoById(ev.detail.id));
  }

}
