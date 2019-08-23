
import { customElementsDefine } from '../customElements';
import preloadImage from '../preloadImage';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

img {
  display: block;
  max-height: 100%;
  width: 100%;
  align-self: middle;
  
  margin-left: auto;
  margin-right: auto;
  opacity: 0;
  
  object-fit: contain;
  overflow: hidden;
  transition: opacity 0.2s linear;
}



img.current {
  opacity: 1;
  transition: opacity 0.2s linear;

}
</style>
<img/>

`;

class SlideshowPhoto extends HTMLElement {


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
        //requestAnimationFrame(() => {
          this._loadImage();
        //});
      break;
    }
  }

  _loadImage() {
    
    const img = this.shadowRoot.querySelector('img');
    
    if (!this.photo || this.currentPhotoId !== this.photo.id) {
      img.className = '';
      return null;
    }

    if (this._loaded) {
      img.className = 'current';
      return null;
    }
    img.setAttribute('data-src', this.photo.src);
    img.setAttribute('alt', this.photo.title);

    preloadImage(this.photo.src, img).then(() => {
      //requestAnimationFrame(() => {
        if (this.currentPhotoId === this.photo.id) {
          img.className = 'current';
          this._loaded = true;
        } else {
          img.className = '';
          
        }
     // });
       
      
      
    });
 
  }
}

customElementsDefine('slideshow-photo', SlideshowPhoto, template);

export default SlideshowPhoto;

