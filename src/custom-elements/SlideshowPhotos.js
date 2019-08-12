import store from '../store';
import { getSlideshowPhotos } from '../selectors';


const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  display: flex;
  height: 100%;
  width: 100000000px;
  position: relative;
  left: 0;
}
</style>
<slot name="progress"></slot>

<slot name="nav"></slot>

`;

export default class SlideshowPhotos extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const photos = getSlideshowPhotos(store.getState());
    photos.forEach((photo, i) => {
      const $photo = document.createElement('slideshow-photo');
      $photo.setAttribute('data-id', photo.id);

      this.shadowRoot.appendChild($photo);
    });
  }
}