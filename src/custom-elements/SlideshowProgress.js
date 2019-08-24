
import { customElementsDefine } from '../customElements';
import './SlideshowProgressBar';
import './SlideshowProgressStats';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  width: 100%;
}
.progress-container {
  background-color: #444;
  width: 100%;
  height: 25px;
  position: absolute;
  cursor: pointer;
  z-index: 2000;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -webkit-tap-highlight-color: transparent;
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

class SlideshowProgress extends HTMLElement {

  static get observedAttributes() {
    return [ 'current-index', 'list-length' ];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.addEventListener('click', this._onClick.bind(this));

    this._$slideshowProgressBar = this.shadowRoot.querySelector('slideshow-progress-bar');
    this._$slideshowProgressStats = this.shadowRoot.querySelector('slideshow-progress-stats');
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
        this._$slideshowProgressBar.currentIndex = newValue;
        this._$slideshowProgressStats.currentIndex = newValue;
        break;
      case 'list-length':
        this._$slideshowProgressBar.listLength = newValue;
        this._$slideshowProgressStats.listLength = newValue;
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

customElementsDefine('slideshow-progress', SlideshowProgress, template);

export default SlideshowProgress;

