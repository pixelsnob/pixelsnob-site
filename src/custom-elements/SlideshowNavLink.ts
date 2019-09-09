
import { customElementsDefine } from '../customElements';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  width: 33%;
  list-style-type: none;
  height: 100%;
  position: relative;
  bottom: 0;
  display: flex;
}
::slotted(a) {
  text-transform: uppercase;
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
}
::slotted(a:hover) {
  font-weight: bold;
  color: white !important;
  text-decoration: none !important;
}
</style>
<slot name="nav-link"></slot>
`;


class SlideshowNavLink extends HTMLElement {
  
  static get observedAttributes() {
    return [ 'action' ];
  }
  
  private actionValue: string = '';

  public connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    this.addEventListener('click', this.onClick.bind(this));
   
  }

  public disconnectedCallback() {
    this.removeEventListener('click', this.onClick.bind(this));
  }

  get action(): string {
    return this.actionValue;
  }

  set action(value: string) {
    this.actionValue = value;
  }

  private onClick(ev: MouseEvent) {
    ev.preventDefault();
    const customEvent = new CustomEvent('nav-action', { detail: { 
      action: this.actionValue
    }})
    this.dispatchEvent(customEvent);

  };



}

customElementsDefine('slideshow-nav-link', SlideshowNavLink, template);

export default SlideshowNavLink;