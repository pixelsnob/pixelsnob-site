
import { component } from '../decorators';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 1);
  display: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  overflow: hidden;
}

:host(.site-overlay-visible) {
  display: block;
  opacity: 1;
}

</style>
<slot name="overlay-content"></slot>
`;

@component('site-overlay', template)
export default class SiteOverlay extends HTMLElement {

  static get observedAttributes() {
    return [ 'visible' ];
  }
  
  public connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  get visible(): boolean {
    const visible = this.getAttribute('visible');
    return visible === '1';
  }

  set visible(value: boolean) {
    this.setAttribute('visible', value ? '1' : '0');
  }

  public attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case 'visible':

        if (this.visible) {
          this.classList.add('site-overlay-visible');
        } else {
          this.classList.remove('site-overlay-visible');
        }
      break;
    }
  }
}
