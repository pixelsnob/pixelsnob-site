
import { customElementsDefine } from '../customElements';

const getTemplate = (currentIndex: number, numPhotos: number) => {
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
  
  public connectedCallback() {
    this.attachShadow({ mode: 'open' });
  }

  get currentIndex(): number {
    const value = this.getAttribute('current-index');
    if (!isNaN(Number(value))) {
      return Number(value);
    }
    return 0;
  }

  set currentIndex(value: number) {
    this.setAttribute('current-index', '' + value);
  }

  get listLength(): number {
    const value = this.getAttribute('list-length');
    if (!isNaN(Number(value))) {
      return Number(value);
    }
    return 0;
  }

  set listLength(value: number) {
    this.setAttribute('list-length', '' + value);
  }

  public attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case 'current-index':
      case 'list-length':
        this.update();
      break;
    }
  }

  // private _onProgressChange(ev: CustomEvent) {
  //   this.currentIndex = ev.detail.currentIndex;
  //   this.listLength = ev.detail.listLength;
  // }

  private update() {
    const currentIndex = this.currentIndex;
    const listLength = this.listLength;
    if (isNaN(currentIndex) || isNaN(listLength)) {
      return null;
    }
    this.shadowRoot!.innerHTML = getTemplate(currentIndex + 1, listLength).innerHTML;
  }
}

customElementsDefine('slideshow-progress-stats', SlideshowProgressStats);

export default SlideshowProgressStats;

