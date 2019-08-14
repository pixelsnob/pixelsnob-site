

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
    const currentIndex = Number(this.getAttribute('current-index'));
    const listLength = Number(this.getAttribute('list-length'));
    if (isNaN(currentIndex) || isNaN(listLength)) {
      this.style.width = 0;
      return null;
    }
    this.style.width = ((currentIndex / (listLength - 1)) * 100) + '%';
  }

}
