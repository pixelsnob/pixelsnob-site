
import preloadImage from '../preloadImage';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  opacity: 1;
  text-align: center;
  vertical-align: middle;
  transition: opacity 0.2s ease-in-out;
  margin-top: 3vh;
}
:host(.photo-visible) {
  
}
img {
  display: inline;
  max-height: 80vh;
  /* align-self: middle;
  @media (max-width: $breakpoint-md) and (orientation: portrait) {
    max-height: 80vh;
  } */
  opacity: 0;
  max-width: 100vw;
  object-fit: contain;
  overflow: hidden;
  transition: opacity 0.4s linear;
}

img.current {
  opacity: 1;
  transition: opacity 0.4s linear;

}
</style>
<img/>
`;

export default class SlideshowPhoto extends HTMLElement {


  static get observedAttributes() {
    return [ 'photo', 'current-photo-id'/*, 'photo-loading'*/ ];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._loaded = false;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  disconnectedCallback() {
    const img = this.shadowRoot.querySelector('img');
    img.className = '';
  }

  _onCurrentPhotoIdChange(evt) {
    this.currentPhotoId = evt.detail.id;
  }

  get photo() {
    return JSON.parse(this.getAttribute('photo'));
  }

  set photo(value) {
    this.setAttribute('photo', JSON.stringify(value));
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
      case 'photo':
      case 'current-photo-id':
        this._loadImage();
      break;
    }
  }

  _loadImage() {
    const img = this.shadowRoot.querySelector('img');
    
    if (!this.photo || this.currentPhotoId !== this.photo.id) {
      img.className = '';
      return null;
    }

    img.setAttribute('data-src', this.photo.src);
    img.setAttribute('alt', this.photo.title);

    const customEvent = new CustomEvent('slideshow-photo-loading', {
      detail: { loading: true }
    });

    this.getRootNode().dispatchEvent(customEvent);

    preloadImage(this.photo.src, img).then(() => {
      if (this.currentPhotoId === this.photo.id) {
        img.className = 'current';
        const customEvent = new CustomEvent('slideshow-photo-loading', {
          detail: { loading: false }
        });
        this.getRootNode().dispatchEvent(customEvent);
      } else {
        img.className = '';
      }
    });
    
  }
}
