

//import touch from '../touch';
//import throttle from 'lodash.throttle';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 100px;
  z-index: 500000000;
  overflow: hidden;
}
.photos-list-container {
  position: absolute;
  
  top: 0;
  width: 100%;
  --photos-list-display: block;
  z-index: 2000;
  /*transition: top 0.2s ease-in;*/
}

</style>
<div class="photos-list-container">
  <photos-list></photos-list>
</div>
`;

export default class PhotosListNav extends HTMLElement {


  static get observedAttributes() {
    return [ 'photos', 'current-photo-id' ];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._photosList =  this.shadowRoot.querySelector('photos-list');
    this._photosList.addEventListener('photos-list-photo-click', this._onPhotosListClick.bind(this), true);
  }  

  get photos() {
    return JSON.parse(this.getAttribute('photos'));
  }

  set photos(photos) {
    this.setAttribute('photos', JSON.stringify(photos));
  }


  get currentPhotoId() {
    return this.getAttribute('current-photo-id');
  }

  set currentPhotoId(value) {
    if (value) {
      value = Number(value);
    }
    this.setAttribute('current-photo-id', value);
  }


  attributeChangedCallback(name, oldValue, newValue) {
    const $photosList = this.shadowRoot.querySelector('photos-list');
    
    switch (name) {
      case 'photos':
        $photosList.photos = this.photos;
      break;
      case 'current-photo-id':
        $photosList.currentPhotoId = this.currentPhotoId;
        this._makeCurrentPhotoVisible();
      break;
    }
  }

  disconnectedCallback() {
    this._photosList.shadowRoot.removeEventListener('photos-list-photo-click', this._onPhotosListClick.bind(this), true);
  }

  _onPhotosListClick(ev) {    
    const customEvent = new CustomEvent('photos-list-photo-change', { detail: { id: ev.detail.id }});
    this.dispatchEvent(customEvent);
  }

  _makeCurrentPhotoVisible() {
    
    const $photosListPhotos = this._photosList.shadowRoot.querySelectorAll('photos-list-photo');
    $photosListPhotos.forEach($photo => {
      if ($photo.photo && $photo.photo.id === this.currentPhotoId) {
        const $photosListContainer = this.shadowRoot.querySelector('.photos-list-container');
        if (($photo.offsetTop + (this.offsetHeight / 2)) > $photosListContainer.offsetHeight) {
          $photosListContainer.style.top = 'auto';
          $photosListContainer.style.bottom = 0;

        } else if ($photo.offsetTop > (this.offsetHeight / 2)) {
          $photosListContainer.style.top = `-${$photo.offsetTop - (this.offsetHeight / 2) + ($photo.offsetHeight / 2)}px`;
          $photosListContainer.style.bottom = 'auto';

        } else {
          $photosListContainer.style.top = 0;
          $photosListContainer.style.bottom = 'auto';
        }
      }
    });

  }  
}