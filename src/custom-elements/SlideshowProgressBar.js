
import { customElementsDefine } from '../customElements';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  position: absolute; 
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #888;
  z-index: 3000;
  
}
:host-context(slideshow-progress:hover) {
  background-color: #aaa;
}
</style>
`;

class SlideshowProgressBar extends HTMLElement {
  
  static get observedAttributes() {
    return [ 'current-index', 'list-length' ];
  }
  
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  disconnectedCallback() {
  }

  get currentIndex() {
    return this.getAttribute('current-index');
  }

  set currentIndex(value) {
    this.setAttribute('current-index', value);
  }

  get listLength() {
    return this.getAttribute('list-length');
  }

  set listLength(value) {
    this.setAttribute('list-length', value);
  }

  _onProgressChange(evt) {
    this.currentIndex = evt.detail.currentIndex;
    this.listLength = evt.detail.listLength;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'current-index':
      case 'list-length':
        this._update();
      break;
    }
  }

  _update() {
    const currentIndex = Number(this.currentIndex);
    const listLength = Number(this.listLength);
    if (isNaN(currentIndex) || isNaN(listLength)) {
      this.style.width = 0;
      return null;
    }
    this.style.width = ((currentIndex / (listLength - 1)) * 100) + '%';
  }

}

customElementsDefine('slideshow-progress-bar', SlideshowProgressBar, template);

export default SlideshowProgressBar;

