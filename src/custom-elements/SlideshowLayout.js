const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  height: 100%;
  width: 100%;
  position: relative;
}
.col-1 {
  height: 100%;
  width: calc(100% - 100px);
  float: left;
}
.col-1-top {
  height: calc(100% - 115px);
  width: 100%;
  padding-top: 20px;
}
.col-1-bottom {
  height: 95px;
  width: 100%; 
}
.col-2 {
  height: 100%;
  width: 100px;
  float: left; 
  position: relative;
}

@media (max-width: 768px) {
  .col-1 {
    width: 100%;
  }
  .col-2 {
    display: none;
  }
}

</style>
<div class="col-1">
  <div class="col-1-top">
    <slot name="slideshow-photos"></slot>
  </div>
  <div class="col-1-bottom">
    <slot name="slideshow-nav-container"></slot>
    <slot name="slideshow-progress-container"></slot>
  </div>

</div>
<div class="col-2">
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