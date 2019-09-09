
import { component } from '../decorators';
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

// function configurable() {
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//       //descriptor.configurable = value;
//     console.log(propertyKey)
//   };
// }

@component('slideshow-photo', template)
export default class SlideshowPhotoComponent extends HTMLElement {

  private loaded: boolean = false;
  private currentPhotoObj: SlideshowPhoto | null = null;

  static get observedAttributes() {
    return [ 'photo', 'current-photo' ];
  }
  
  public connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  public disconnectedCallback() {
    const img: HTMLImageElement | null = this.shadowRoot!.querySelector('img');
    if (img) {
      img.className = '';
    }
  }

  get photo(): SlideshowPhoto | null {
    const photo = this.getAttribute('photo');
    if (photo) {
      return JSON.parse(photo);
    }
    return null;
  }

  set photo(value: SlideshowPhoto | null) {
    this.setAttribute('photo',  JSON.stringify(value));
  }

  get currentPhoto(): SlideshowPhoto | null {
    const photo = this.getAttribute('current-photo');
    if (photo) {
      return JSON.parse(photo);
    }
    return null;
  }

  set currentPhoto(value: SlideshowPhoto | null) {
    this.setAttribute('current-photo', JSON.stringify(value));
    this.currentPhotoObj = value;
  }

  public attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case 'photo':
      case 'current-photo':
        this.loadImage();
      break;
    }
  }

  private loadImage() {
    const img = this.shadowRoot!.querySelector('img');
    if (!img) {
      return null;
    }

    if (!this.photo || !this.currentPhoto || this.currentPhoto.id !== this.photo.id) {
      img.className = '';
      return null;
    }
    if (this.loaded) {
      img.className = 'current';
      return null;
    }

    img.setAttribute('data-src', this.photo.src);
    img.setAttribute('alt', this.photo.title);

    preloadImage(this.photo.src, img).then(() => {
      if (this.currentPhoto && this.photo && this.currentPhoto.id === this.photo.id) {
        img.className = 'current';
        this.loaded = true;
      } else {
        img.className = '';
        
      }
      
    });
 
  }
}

