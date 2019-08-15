

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
span {
  opacity: 0;
  transition: opacity 0.5s;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
span.loaded {
  opacity: 1;
  transition: opacity 0.5s;
}
img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
  
  transition: opacity 0.5s;
}

</style>
<span>
  <img alt="" data-src=""/>
</span>
`;

export default class PhotosListPhoto extends HTMLElement {

  static get observedAttributes() {
    return [ 'photo' ];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._loaded = false;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.addEventListener('click', this._onClick.bind(this));

    let options = {
      //root: document.querySelector('#scrollArea'),
      rootMargin: '200px',
      threshold: 1.0
    }

    
    // Lazy load only if image is within viewport
    this._intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          //console.log('?', this._loaded);
          this._loadImage();
        }
      });
    }, options);
    this._intersectionObserver.observe(this);
  }

  get photo() {
    return JSON.parse(this.getAttribute('photo'));
  }

  set photo(photo) {
    this.setAttribute('photo', JSON.stringify(photo));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name)
    switch (name) {
      case 'photo':
        if (this._loaded && this.isConnected) {

          this.shadowRoot.appendChild(template.content.cloneNode(true));
          this._loadImage();
          
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
