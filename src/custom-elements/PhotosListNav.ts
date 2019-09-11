
import { component } from '../decorators';
import PhotosListComponent from './PhotosList';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 100px;
  overflow: hidden;
}
.photos-list-container {
  position: absolute;
  overflow-y: scroll;
  top: 0;
  width: 100%;
  height: 100%;
  --photos-list-display: block;
  z-index: 2000;
  -ms-overflow-style: none;  /* IE 10+ */
  scrollbar-width: none;  /* Firefox */
}
.photos-list-container::-webkit-scrollbar { 
  display: none;  /* Safari and Chrome */
}
</style>
<div class="photos-list-container">
  <photos-list scroll-current-photo-into-view="1"></photos-list>
</div>
`;

@component('photos-list-nav', template)
export default class PhotosListNavComponent extends HTMLElement {

  private $photosList: PhotosListComponent | null = null;

  static get observedAttributes() {
    return [ 'photos', 'current-photo' ];
  }

  public connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    this.$photosList = this.shadowRoot!.querySelector('photos-list') as PhotosListComponent;
    this.$photosList.scrollCurrentPhotoIntoView = true;
    this.$photosList.addEventListener('photos-list-photo-click', this.onPhotosListClick.bind(this), true);
  }

  public disconnectedCallback() {
    this.$photosList!.removeEventListener('photos-list-photo-click', this.onPhotosListClick.bind(this), true);
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
    this.setAttribute('current-photo',  JSON.stringify(value));
  }

  public attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    const $photosList = this.shadowRoot!.querySelector('photos-list') as PhotosListComponent;
    switch (name) {
      case 'photos':
        $photosList.photos = this.photos;
      break;
      case 'current-photo':
        $photosList.currentPhoto = this.currentPhoto;
      break;
    }
  }

  private onPhotosListClick(ev: CustomEventInit) {
    const customEvent = new CustomEvent('photos-list-photo-change', { detail: { id: ev.detail.id }});
    this.dispatchEvent(customEvent);
  }
}

