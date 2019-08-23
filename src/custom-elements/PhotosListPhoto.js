import preloadImage from '../preloadImage';
import { customElementsDefine } from '../customElements';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  margin: 0;
  list-style: none;
  padding-top: 100%;
  display: block;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  outline: none !important;
}
:host(.dimmed) {
  opacity: 0.6;
}
:host(.dimmed:hover) {
  opacity: 0.4;
}
:host(.dimmed:active) {
  opacity: 0.8;
}
span {
  opacity: 0;
  transition: opacity 0.4s;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
span.loaded {
  opacity: 1;
  transition: opacity 0.4s;
}
img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
  
  transition: opacity 0.4s;
}

</style>
<span>
  <img alt="" data-src=""/>
</span>
`;

class PhotosListPhoto extends HTMLElement {

  static get observedAttributes() {
    return [ 'photo', 'current-photo-id' ];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._loaded = false;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.addEventListener('click', this._onClick.bind(this));
    this._observe();
  }

  _observe() {
    const intersectionObserverOptions = {
      rootMargin: '100px 0px 100px 0px',
    }
    // Lazy load only if image is within viewport
    this._intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this._loadImage();
        }
      });
    }, intersectionObserverOptions);

    this._intersectionObserver.observe(this);
  }

  get photo() {
    return JSON.parse(this.getAttribute('photo'));
  }

  set photo(photo) {
    this.setAttribute('photo', JSON.stringify(photo));
  }

  get currentPhotoId() {
    return this.getAttribute('current-photo-id');
  }

  set currentPhotoId(value) {
    this.setAttribute('current-photo-id', value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    
    switch (name) {
      case 'photo':
        // Use photo's dominant/average color as a placeholder until it loads
        if (Array.isArray(this.photo.dominantColor) && this.photo.dominantColor.length === 3) {
          this.style.backgroundColor = `rgb(${this.photo.dominantColor.join(',')})`;
        }
        if (this._loaded && this.isConnected) {
          this._loadImage(); 
        }
      break;
      case 'current-photo-id':
        if (newValue && newValue === this.photo.id) {
          this.classList.remove('dimmed');

        } else if (!isNaN(newValue)) {
          this.classList.add('dimmed');
        }
      break;
    }
  }

  _onClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const customEvent = new CustomEvent('photos-list-photo-click', {
      detail: {
        id: this.photo.id
      }
    });
    this.dispatchEvent(customEvent);
  }

  _loadImage() {
    const $img = this.shadowRoot.querySelector('img');
    const $imgContainer = this.shadowRoot.querySelector('span');
    preloadImage(this.photo.src_small, $img).then(() => {
      
      this._intersectionObserver.unobserve(this);
      this._loaded = true;
      $imgContainer.classList.add('loaded');

    });
  }

  disconnectedCallback() {
    this._intersectionObserver.unobserve(this);
  }
}

customElementsDefine('photos-list-photo', PhotosListPhoto, template);

export default PhotosListPhoto;