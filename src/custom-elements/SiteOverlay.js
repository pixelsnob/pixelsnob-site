
const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
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

export default class SiteOverlay extends HTMLElement {

  static get observedAttributes() {
    return [ 'visible' ];
  }
  
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get visible() {
    const visible = JSON.parse(this.getAttribute('visible'));
    if (visible.value) {
      return visible.value;
    }
  }

  set visible(value) {
    this.setAttribute('visible', JSON.stringify(value));
  }

  attributeChangedCallback(name, oldValue, newValue) {
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

  disconnectedCallback() {
    
  }
}
