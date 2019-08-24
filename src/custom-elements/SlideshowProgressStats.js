
import { customElementsDefine } from '../customElements';

const getTemplate = (currentIndex, numPhotos) => {
  const template = document.createElement('template');
  template.innerHTML = `
<style>
.stats {
  width: 100%;
  height: 100%;

  display: block;
  color: #fff;
  line-height: 1.7;
  
  font-size: 0.8rem;
  white-space: nowrap;
  text-align: center;
  
  position: absolute;
  left: calc(50% - 40px);
  z-index: 4000;
  width: 80px;
  height: 100%;
  
  /* margin-left: auto;
  margin-right: auto; */
}
</style>
<span class="stats">${currentIndex} of ${numPhotos}</span>`;

  return template;
};

class SlideshowProgressStats extends HTMLElement {

  static get observedAttributes() {
    return [ 'current-index', 'list-length' ];
  }
  
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
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
    const currentIndex = Number(this.getAttribute('current-index'));
    const listLength = Number(this.getAttribute('list-length'));
    if (isNaN(currentIndex) || isNaN(listLength)) {
      return null;
    }
    this.shadowRoot.innerHTML = getTemplate(currentIndex + 1, listLength).innerHTML;
  }
}

customElementsDefine('slideshow-progress-stats', SlideshowProgressStats);

export default SlideshowProgressStats;

