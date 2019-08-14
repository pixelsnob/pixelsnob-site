

const getTemplate = (currentIndex, numPhotos) => {
  const template = document.createElement('template');
  template.innerHTML = `
<style>
:host {
  position: absolute;
  width: 80px;
  height: 20px;
  line-height: 2;
  display: block;
  top: 0px;
  left: calc(50% - 40px);
  color: #fff;
  font-size: 0.8rem;
  white-space: nowrap;
  text-align: center;
  z-index: 2000;
}
</style>
<span>${currentIndex} of ${numPhotos}</span>`;

  return template;
};


export default class SlideshowProgressStats extends HTMLElement {

  static get observedAttributes() {
    return [ 'current-index', 'list-length' ];
  }
  
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
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
    this.shadowRoot.innerHTML = getTemplate(currentIndex + 1, listLength).innerHTML;
  }

  disconnectedCallback() {
    
  }
}
