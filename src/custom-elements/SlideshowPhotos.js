
const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  display: flex;
  height: 100%;
  width: 100000000px;
  position: relative;
  left: 0;
}
</style>

<div class="slideshow-photos-list"></div>

<slot name="progress"></slot>
<slot name="nav"></slot>

`;

export default class SlideshowPhotos extends HTMLElement {

  static get observedAttributes() {
    return [ 'photos', 'current-photo-id' ];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get photos() {
    return JSON.parse(this.getAttribute('photos'));
  }

  set photos(value) {
    this.setAttribute('photos', JSON.stringify(value));
  }

  get currentPhotoId() {
    return this.getAttribute('current-photo-id');
  }

  set currentPhotoId(value) {
    this.setAttribute('current-photo-id', value ? value : '');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'photos':
        this._updateList();
      break;
      case 'current-photo-id':
        this._onCurrentPhotoIdChange();

      break;
    }
  }

  _onCurrentPhotoIdChange() {
    const $list = this.shadowRoot.querySelector('.slideshow-photos-list');
    const customEvent = new CustomEvent('current-photo-id-change', {
      detail: { id: this.currentPhotoId ? this.currentPhotoId : null }
    });
    $list.dispatchEvent(customEvent);
  }

  _updateList() {
    const $list = this.shadowRoot.querySelector('.slideshow-photos-list');
    $list.innerHTML = '';
    this.photos.forEach(photo => {
      const $photo = document.createElement('slideshow-photo');
      $list.appendChild($photo);
      $photo.photo = photo;
    });
  }

  disconnectedCallback() {
  }
}