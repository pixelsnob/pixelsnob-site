
const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  width: 33vw;
  list-style-type: none;
  height: 100%;
  position: relative;
  bottom: 0;
  display: flex;
  border: 1px solid yellow;
}
::slotted(a) {
  text-transform: uppercase;
  display: inline-block;
  width: 100%;
  line-height: 0.8;
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

export default class SlideshowNavLink extends HTMLElement {

  static get observedAttributes() {
    return [ 'action' ];
  }
  
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.addEventListener('click', this._onClick.bind(this));
   
  }  

  get action() {
    return this.getAttribute('action');
  }

  set action(action) {
    this.setAttribute('action', action);
  }

  _onClick(ev) {
    ev.preventDefault();
    const customEvent = new CustomEvent('nav-link-click', { detail: { 
      action: this.action
    }})
    this.dispatchEvent(customEvent);
  };

  disconnectedCallback() {
    this.removeEventListener('click', this._onClick.bind(this));

  }

}