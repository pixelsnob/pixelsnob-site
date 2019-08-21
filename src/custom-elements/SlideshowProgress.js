

const template = document.createElement('template');
template.innerHTML = `
<style>

.progress-container {
  background-color: #444;
  width: 100%;
  height: 25px;
  position: relative;
  cursor: pointer;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}

.progress-container:hover {
  background-color: #666;
}
</style>
<div class="progress-container">
  <slideshow-progress-bar></slideshow-progress-bar>
  <slideshow-progress-stats></slideshow-progress-stats>
</div>
`;

export default class SlideshowProgress extends HTMLElement {

  static get observedAttributes() {
    return [ 'current-index', 'list-length' ];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.addEventListener('click', this._onClick.bind(this));

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

  _onClick(ev) {
    ev.preventDefault();
    const $progressContainer = this.shadowRoot.querySelector('.progress-container');
    if (!isNaN(Number(this.listLength))) {
      const photoListIndex = Math.ceil((ev.clientX / $progressContainer.clientWidth) * (this.listLength - 1));
      const customEvent = new CustomEvent('progress-update-photo-by-index', {
        detail: {
          photoListIndex
        }
      });
      this.dispatchEvent(customEvent);
    }
  }
}
