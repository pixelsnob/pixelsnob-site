

import touch from '../touch';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  position: fixed;
  bottom: 25px;
  height: 36px;
  z-index: 550;
  width: 100vw;
  opacity: 1;
  left: 0;
  transition: opacity 0.5s ease;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  display: block;
}

::slotted(.photos-slideshow-nav) {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
<slot name="nav-links"></slot>
`;

export default class SlideshowNav extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._removeTouch = touch(document, this.ontouch.bind(this));
    //document.addEventListener('keydown', this.keydown.bind(this));
  }  

  previous() {
    //store.dispatch(setSlideshowPhotoIdToPrevious());
  };

  next() {
    //store.dispatch(setSlideshowPhotoIdToNext());
  };

  close() {
    //store.dispatch(setSlideshowPhotoId(null));
  };

  keydown(evt) {    
    switch(evt.keyCode) {
      case 37:
      case 38:
        this.previous();
      break;
      case 39:
      case 40:
        this.next();
      break;
      case 27:
        this.close();
      break;
    }
  }

  ontouch(touchEventName) {
    store.dispatch(enableTouch());
    switch (touchEventName) {
      case 'left':
        this.next();
        break;
      case 'right':
        this.previous();
        break;
    }
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.keydown.bind(this));
    this._removeTouch();
  }

}