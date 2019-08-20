
const listTemplate = document.createElement('template');
listTemplate.innerHTML = `
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
  @media (min-width: 768px) {
    display: none;
  }
}

</style>
`;

export default class PhotosList extends HTMLElement {

  static get observedAttributes() {
    return [ 'photos', 'current-photo-id' ];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.addEventListener('photos-list-photo-click', this._photosListPhotoClick.bind(this), true);
    
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('photos-list-photo-click', this._photosListPhotoClick.bind(this), true);
  }

  _photosListPhotoClick(ev) {
    const customEvent = new CustomEvent('photos-list-photo-click', { detail: ev.detail });
    this.dispatchEvent(customEvent);
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
    switch (name) {
      case 'photos':
        this._updatePhotos();
      case 'current-photo-id':
        this._updateCurrentPhotoId();
      break;
    }
  }

  _updatePhotos() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(listTemplate.content.cloneNode(true));

    this.photos.forEach(photo => {
      const $photo = document.createElement('photos-list-photo');
      this.shadowRoot.appendChild($photo);
      $photo.photo = photo;
      $photo.currentPhotoId = this.currentPhotoId;
    });
  }

  _updateCurrentPhotoId() {
    const $photos = this.shadowRoot.querySelectorAll('photos-list-photo');
    $photos.forEach($photo => $photo.currentPhotoId = this.currentPhotoId);

  }

}
