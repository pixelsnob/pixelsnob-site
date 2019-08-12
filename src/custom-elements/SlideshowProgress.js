

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  position: fixed;
  bottom: 0px;
  height: 25px;
  width: 100%;
  background-color: #444;
  z-index: 1100;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  cursor: pointer;
  z-index: 600;
}
:host(:hover) {
  background-color: #666;
}
</style>
<slot name="progress-bar"></slot>
<slot name="progress-stats"></slot>
`;

export default class SlideshowProgress extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

}
