
import { customElementsDefine } from '../customElements';

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

class PhotosListNav extends HTMLElement {

  static get observedAttributes() {
    return [ 'photos', 'current-photo-id' ];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._photosList =  this.shadowRoot.querySelector('photos-list');
    this._photosList.addEventListener('photos-list-photo-click', this._onPhotosListClick.bind(this), true);

    this._scrollCurrentPhotoIntoView = true;
  }  

  disconnectedCallback() {
    this._photosList.shadowRoot.removeEventListener('photos-list-photo-click', this._onPhotosListClick.bind(this), true);
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

  _onPhotosListClick(ev) {
    this._scrollCurrentPhotoIntoView = false;
    const customEvent = new CustomEvent('photos-list-photo-change', { detail: { id: ev.detail.id }});
    this.dispatchEvent(customEvent);
  }

  _makeCurrentPhotoVisible() {
    // Don't scroll if this list was clicked on
    if (!this._scrollCurrentPhotoIntoView) {
      this._scrollCurrentPhotoIntoView = true;
      return null;
    }
    const $photosListPhotos = this._photosList.shadowRoot.querySelectorAll('photos-list-photo');
    $photosListPhotos.forEach($photo => {
      if ($photo.photo && $photo.photo.id === this.currentPhotoId) {
        const $photosListContainer = this.shadowRoot.querySelector('.photos-list-container');
        //$photosListContainer.scrollTo(0, $photo.offsetTop -  (this.offsetHeight / 2) + ($photo.offsetHeight / 2));

      }
    });

  }  
}

customElementsDefine('photos-list-nav', PhotosListNav, template);

export default PhotosListNav;

