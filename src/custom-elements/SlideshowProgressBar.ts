
import { component } from '../decorators';

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

@component('slideshow-progress-bar', template)
export default class SlideshowProgressBar extends HTMLElement {
  
  static get observedAttributes() {
    return [ 'current-index', 'list-length' ];
  }
  
  public connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
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

  // private onProgressChange(ev: CustomEvent) {
  //   this.currentIndex = ev.detail.currentIndex;
  //   this.listLength = ev.detail.listLength;
  // }

  private update() {
    const currentIndex = Number(this.currentIndex);
    const listLength = Number(this.listLength);
    if (isNaN(currentIndex) || isNaN(listLength)) {
      this.style.width = '0';
      return null;
    }
    this.style.width = ((currentIndex / (listLength - 1)) * 100) + '%';
  }

}
