

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  position: absolute;
  height: 70%;
  top: 4px;
  left: 0;
  background-color: #888;
  z-index: 1000;
}
:host-context(slideshow-progress:hover) {
  background-color: #aaa;
}
</style>
`;

export default class SlideshowProgressBar extends HTMLElement {
  
  static get observedAttributes() {
    return [ 'current-index', 'list-length' ];
  }
  
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._boundOnProgressChange = this._onProgressChange.bind(this);
    this.getRootNode().addEventListener('progress-changed', this._boundOnProgressChange, true);

  }

  disconnectedCallback() {
    this.getRootNode().removeEventListener('progress-changed', this._boundOnProgressChange, true);
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
        if (oldValue !== newValue) {
          this._update();
        }
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
