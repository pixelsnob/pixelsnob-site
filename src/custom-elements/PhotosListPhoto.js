

import preloadImage from '../preloadImage';
import isElementInViewport from '../isElementInViewport';
import throttle from 'lodash/throttle';

const getTemplate = photo => {
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
  opacity: 1;
  transition: opacity 0.5s;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.5s;
}
img.loaded {
  opacity: 1;
  transition: opacity 0.5s;
}
</style>
<span>
  <img alt="${photo.title}" data-src="${photo.src}"/>
</span>
`;
  return template;
};

export default class PhotosListPhoto extends HTMLElement {

  static get observedAttributes() {
    return [ 'photo' ];
  }


  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._loaded = false;
    this._boundUpdate = throttle(this._update.bind(this), 20);
    this.shadowRoot.appendChild(getTemplate(this.photo).content.cloneNode(true));
    window.addEventListener('scroll', this._boundUpdate, false);
  }


  get photo() {
    return JSON.parse(this.getAttribute('photo'));
  }

  set photo(photo) {
    this.setAttribute('photo', JSON.stringify(photo));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'photo':
        this._update();
      break;
    }
  }

  _update() {
    
    requestAnimationFrame(() => {
      if (!this._loaded && isElementInViewport(this)) {
        const $img = this.shadowRoot.querySelector('img');
        if (!$img) {
          return null;
        }
        preloadImage(this.photo.src_small, this.shadowRoot.querySelector('img')).then(() => {
          $img.classList.add('loaded')
          window.removeEventListener('scroll', this._boundUpdate, false);
        });
      }
    })
  }

  disconnectedCallback() {
    window.removeEventListener('scroll',  this._boundUpdate, false);

  }
}
