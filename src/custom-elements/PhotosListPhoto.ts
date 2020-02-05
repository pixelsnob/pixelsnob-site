
import { component } from '../decorators';
import preloadImage from '../preloadImage';

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
  opacity: 0.3;
}
:host(.dimmed:hover) {
  opacity: 0.85;
}
:host(.dimmed:active) {
  opacity: 0.95;
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

@component('photos-list-photo', template)
export default class PhotosListPhotoComponent extends HTMLElement {

  private loaded: boolean = false;
  private preventScrollOnClick: boolean = false;
  private intersectionObserver: IntersectionObserver | null = null;

  static get observedAttributes() {
    return [ 'photo', 'current-photo', 'scroll-current-photo-into-view' ];
  }

  public connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.loaded = false;
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    this.addEventListener('click', this.onClick.bind(this));
    this.observe();
  }

  public disconnectedCallback() {
    this.intersectionObserver!.unobserve(this);
  }

  get photo(): SlideshowPhoto | null {
    const photo = this.getAttribute('photo');
    if (photo) {
      return JSON.parse(photo);
    }
    return null;
  }

  set photo(value: SlideshowPhoto | null) {
    this.setAttribute('photo', JSON.stringify(value));
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
  }

  get scrollCurrentPhotoIntoView(): boolean {
    const value = this.getAttribute('scroll-current-photo-into-view');
    return value === '1';
  }

  set scrollCurrentPhotoIntoView(value: boolean) {
    this.setAttribute('scroll-current-photo-into-view', value ? '1' : '0');
  }

  public attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    
    switch (name) {
      case 'current-photo':
        if (!this.scrollCurrentPhotoIntoView || !this.currentPhoto || !this.photo) {
          this.classList.remove('dimmed');
          break;
        }
        if (this.currentPhoto.id === this.photo.id) {
          if (this.preventScrollOnClick) {
            this.preventScrollOnClick = false;
          } else {
            requestAnimationFrame(() => this.scrollIntoView());
          }
          this.classList.remove('dimmed');
        } else {
          this.classList.add('dimmed');
        }
      break;
      case 'photo':
        // Use photo's dominant/average color as a placeholder until it loads
        if (this.photo && Array.isArray(this.photo.dominantColor) && this.photo.dominantColor.length === 3) {
          this.style.backgroundColor = `rgb(${this.photo.dominantColor.join(',')})`;
        }
        if (this.loaded && this.isConnected) {
          this.loadImage(); 
        }
      break;
    }
  }

  private observe() {
    const intersectionObserverOptions = {
      rootMargin: '100px 0px 100px 0px',
    }
    // Lazy load only if image is within viewport
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage();
        }
      });
    }, intersectionObserverOptions);

    this.intersectionObserver.observe(this);
  }

  private onClick(ev: Event) {
    this.preventScrollOnClick = true;
    ev.preventDefault();
    ev.stopPropagation();
    const customEvent = new CustomEvent('photos-list-photo-click', {
      detail: {
        id: this.photo!.id
      }
    });
    this.dispatchEvent(customEvent);
  }

  private  loadImage() {
    const $img = this.shadowRoot!.querySelector('img');
    const $imgContainer = this.shadowRoot!.querySelector('span');
    preloadImage(this.photo!.src_small, $img!).then(() => {
      
      this.intersectionObserver!.unobserve(this);
      this.loaded = true;
      if ($imgContainer) {
        $imgContainer.classList.add('loaded');

      }

    });
  }
}
