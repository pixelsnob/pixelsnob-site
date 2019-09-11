
import { component } from '../decorators';
import PhotosListPhotoComponent from './PhotosListPhoto';
import SlideshowPhotoComponent from './SlideshowPhoto';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  margin: 0;
  padding: 0;
  display: var(--photos-list-display, grid);
  height: 100%;
  width: var(--photos-list-width, 100%);
  grid-template-columns: repeat(5, 1fr);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}

</style>
`;

@component('photos-list', template)
export default class PhotosListComponent extends HTMLElement {

  static get observedAttributes() {
    return [ 'photos', 'current-photo', 'scroll-current-photo-into-view' ];
  }

  public connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.addEventListener('photos-list-photo-click', this.photosListPhotoClick.bind(this), true);
  }

  public disconnectedCallback() {
    this.shadowRoot!.removeEventListener('photos-list-photo-click', this.photosListPhotoClick.bind(this), true);
  }

  get photos(): SlideshowPhoto[] {
    const photos: string | null = this.getAttribute('photos');
    if (photos) {
      return JSON.parse(photos);
    }
    return [];
  }

  set photos(value: SlideshowPhoto[]) {
    this.setAttribute('photos', JSON.stringify(value));
  }

  get currentPhoto(): SlideshowPhoto | null {
    const photo = this.getAttribute('current-photo');
    if (photo) {
      return JSON.parse(photo);
    }
    return null;
  }

  set currentPhoto(value: SlideshowPhoto | null) {
    this.setAttribute('current-photo', JSON.stringify(value));
  }

  get scrollCurrentPhotoIntoView(): boolean {
    const value = this.getAttribute('scroll-current-photo-into-view');
    return value === '1';
  }

  set scrollCurrentPhotoIntoView(value: boolean) {
    this.setAttribute('scroll-current-photo-into-view', value ? '1' : '0');
  }

  public attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case 'photos':
        this.initPhotos();
      break;
      case 'current-photo':
      case 'scroll-current-photo-into-view':
        this.updatePhotos();
      break;
    }
  }

  private photosListPhotoClick(ev: CustomEventInit) {
    const customEvent = new CustomEvent('photos-list-photo-click', { detail: ev.detail });
    this.dispatchEvent(customEvent);
  }

  private initPhotos() {
    this.shadowRoot!.innerHTML = '';
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    this.photos.forEach(photo => {
      const $photo = document.createElement('photos-list-photo') as PhotosListPhotoComponent;
      this.shadowRoot!.appendChild($photo);
      $photo.photo = photo;
      $photo.currentPhoto = this.currentPhoto;
      $photo.scrollCurrentPhotoIntoView = this.scrollCurrentPhotoIntoView;
    });
  }

  private updatePhotos() {
    if (!this.shadowRoot) {
      return null;
    }
    const $photos = this.shadowRoot.querySelectorAll('photos-list-photo') as NodeListOf<PhotosListPhotoComponent>;
    $photos.forEach(($photo => {
      $photo.currentPhoto = this.currentPhoto;
      $photo.scrollCurrentPhotoIntoView = this.scrollCurrentPhotoIntoView;
    }));
  }
}

