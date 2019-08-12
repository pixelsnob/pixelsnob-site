

import { setSlideshowPhotoIdToPrevious, setSlideshowPhotoIdToNext, setSlideshowPhotoId } from '../actions';

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
    //console.log(this.action)
    // this._storeUnsubscribe = createObserver(store)(
    //   state => ({ touchEnabled: state.touchEnabled }),
    //   (key, value) => {
    //     if (value && this.dataset.action !== 'close') {
    //       // Hide previous and next link if touch is enabled
    //       this.style.display = 'none';
    //     }
    //   }
    // );
  }  


  get action() {
    return this.getAttribute('action');
  }

  set action(action) {
    this.setAttribute('action', action);
  }

  _onClick(ev) {
    ev.preventDefault();
    this.shadowRoot.dispatchEvent(new CustomEvent('nav-link-click', { detail: { 
      action: this.action
    }}));
  };

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick.bind(this));

  }

}