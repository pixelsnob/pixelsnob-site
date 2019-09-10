
import { component } from '../decorators';
import PhotosListComponent from './PhotosList';
import PhotosListPhotoComponent from './PhotosListPhoto';

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
  <photos-list></photos-list>
</div>
`;

@component('photos-list-nav', template)
export default class PhotosListNav extends HTMLElement {

  private $photosList: PhotosListComponent | null = null;
  private scrollCurrentPhotoIntoView: boolean = false;

  static get observedAttributes() {
    return [ 'photos', 'current-photo-id' ];
  }

  public connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    this.$photosList = this.shadowRoot!.querySelector('photos-list') as PhotosListComponent;
    this.$photosList.addEventListener('photos-list-photo-click', this.onPhotosListClick.bind(this), true);
    this.scrollCurrentPhotoIntoView = true;
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
      case 'current-photo-id':
        $photosList.currentPhoto = this.currentPhoto;
        this.makeCurrentPhotoVisible();
      break;
    }
  }

  private onPhotosListClick(ev: CustomEventInit) {
    this.scrollCurrentPhotoIntoView = false;
    const customEvent = new CustomEvent('photos-list-photo-change', { detail: { id: ev.detail.id }});
    this.dispatchEvent(customEvent);
  }

  private makeCurrentPhotoVisible() {
    // Don't scroll if this list was clicked on
    if (!this.scrollCurrentPhotoIntoView) {
      this.scrollCurrentPhotoIntoView = true;
      return null;
    }
    const $photosListPhotos = this.$photosList!.shadowRoot!.querySelectorAll('photos-list-photo') as NodeListOf<PhotosListPhotoComponent>;
    $photosListPhotos.forEach(($photo) => {
      if ($photo.photo && this.currentPhoto && $photo.photo.id === this.currentPhoto.id) {
        const $photosListContainer = this.shadowRoot!.querySelector('.photos-list-container');
        if (!$photosListContainer) {
          return null
        }
        if (!$photosListContainer.scrollTo) {
          setTimeout(() => $photo.scrollIntoView(), 200);
          return null;
        }
        $photosListContainer.scrollTo(0, $photo.offsetTop -  (this.offsetHeight / 2) + ($photo.offsetHeight / 2));
      }
    });

  }  
}

