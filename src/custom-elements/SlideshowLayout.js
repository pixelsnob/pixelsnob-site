const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  height: 100%;
  width: 100%;
  position: relative;
}
.left {
  height: 100%;
  width: calc(100% - 100px);
  float: left;
}
.left-top {
  height: calc(100% - 80px);
  width: 100%;
}
.left-bottom {
  height: 80px;
  width: 100%; 
}
.right {
  height: 100%;
  width: 100px;
  float: left; 
}
</style>
<div class="left">
  <div class="left-top">
    <slot name="slideshow-photos"></slot>
  </div>
  <div class="left-bottom">
    <slot name="slideshow-nav-container"></slot>
    <slot name="slideshow-progress-container"></slot>
  </div>

</div>
<div class="right">
  <slot name="photos-list-nav"></slot>
</div>
`;

export default class SlideshowLayout extends HTMLElement {

  static get observedAttributes() {
    return [ 'photos', 'current-photo-id' ];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}