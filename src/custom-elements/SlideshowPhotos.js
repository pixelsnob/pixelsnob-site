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

export default class SlideshowPhotos extends HTMLElement {

  static get observedAttributes() {
    return [ 'photos', 'current-photo-id' ];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._$photos = [];
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
        this._$photos.forEach($photo => {
          $photo.currentPhotoId = newValue;
        });
      break;
    }
  }

  _updateList() {
    const $list = this.shadowRoot.querySelector('.slideshow-photos-list');
    $list.innerHTML = '';
    this._$photos = [];
    this.photos.forEach(photo => {
      const $photo = document.createElement('slideshow-photo');
      $list.appendChild($photo);
      $photo.photo = photo;
      $photo.currentPhotoId = this.currentPhotoId;
      this._$photos.push($photo);
    });
  }

}