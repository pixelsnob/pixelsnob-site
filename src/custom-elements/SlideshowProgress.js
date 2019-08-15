

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  position: fixed;
  bottom: 0px;
  height: 25px;
  width: 100%;
  background-color: #444;
  z-index: 1100;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  cursor: pointer;
  z-index: 600;
}
:host(:hover) {
  background-color: #666;
}
</style>
<slideshow-progress-bar></slideshow-progress-bar>
<slideshow-progress-stats></slideshow-progress-stats>
`;

export default class SlideshowProgress extends HTMLElement {

  static get observedAttributes() {
    return [ 'current-index', 'list-length' ];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get currentIndex() {
    return this.getAttribute('current-index');
  }

  set currentIndex(currentIndex) {
    this.setAttribute('current-index', currentIndex);
  }

  get listLength() {
    return this.getAttribute('list-length');
  }

  set listLength(listLength) {
    this.setAttribute('list-length', listLength);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'current-index':
      case 'list-length':
        const customEvent = new CustomEvent('progress-changed', {
          detail: { 
            listLength: this.listLength,
            currentIndex: this.currentIndex
          }
        });
        this.shadowRoot.dispatchEvent(customEvent);

      break;
    }
  }
}
