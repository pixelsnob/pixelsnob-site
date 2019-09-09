
import { component } from '../decorators';
import SlideshowPhotoComponent from './SlideshowPhotoComponent';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  height: 100%;
  width: 100%;
}
.slideshow-photos-list {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

<div class="slideshow-photos-list"></div>
`;

@component('slideshow-photos', template)
export default class SlideshowPhotosComponent extends HTMLElement {
  
  public shadowRoot: ShadowRoot | any;
  private $photos: SlideshowPhotoComponent[] = [];
  
  static get observedAttributes() {
    return [ 'photos', 'current-photo' ];
  }

  public connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
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
    switch (name) {
      case 'photos':
        this.populatePhotosList();
      break;
      case 'current-photo':
        this.updatePhotosCurrentPhoto();
      break;
    }
  }

  private updatePhotosCurrentPhoto() {
    this.$photos.forEach($photo => {
      $photo.currentPhoto = this.currentPhoto;
    });
  }

  private populatePhotosList() {
    const $list = this.shadowRoot.querySelector('.slideshow-photos-list');
    if (!$list) {
      return null;
    }
    $list.innerHTML = '';
    this.$photos = [];
    this.photos.forEach(photo => {
      const $photo = document.createElement('slideshow-photo') as SlideshowPhotoComponent;
      $list.appendChild($photo);
      $photo.photo = photo;
      $photo.currentPhoto = this.currentPhoto;
      this.$photos.push($photo);
    });
  }
}


