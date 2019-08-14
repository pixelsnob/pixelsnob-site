
const listTemplate = document.createElement('template');
listTemplate.innerHTML = `
<style>
:host {
  margin: 0;
  padding: 0;
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}
.photos-list-photo {
  margin: 0;
  list-style: none;
  padding-top: 100%;
  display: block;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  outline: none !important;
  border: 1px solid red;
}
</style>
`;

const listItemTemplate = document.createElement('template');
listItemTemplate.innerHTML = `
<photos-list-photo className="aspect-ratio-box" />`;

export default class PhotosList extends HTMLElement {

  static get observedAttributes() {
    return [ 'photos' ];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
  }

  get photos() {
    return JSON.parse(this.getAttribute('photos'));
  }

  set photos(photos) {
    this.setAttribute('photos', JSON.stringify(photos));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'photos':
        this._update();
      break;
    }
  }

  _update() {
    requestAnimationFrame(() => {
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(listTemplate.content.cloneNode(true));

      this.photos.forEach(photo => {
        requestAnimationFrame(() => {
          const $photo = document.createElement('photos-list-photo');
          $photo.className = 'photo aspect-ratio-box';
          this.shadowRoot.appendChild($photo);
          $photo.photo = photo;
        });
      });
    });
  }

}
