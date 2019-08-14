

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

.photos-slideshow-nav {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

/** style links here? **/

</style>

<div class="photos-slideshow-nav">
  <slideshow-nav-link action="previous"><a slot="nav-link">&#x2190;</a></slideshow-nav-link>
  <slideshow-nav-link action="close"><a slot="nav-link">&times;</a></slideshow-nav-link>
  <slideshow-nav-link action="next"><a slot="nav-link">&#x2192;</a></slideshow-nav-link>
</div>`;

export default class SlideshowNav extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._removeTouch = touch(document, this.ontouch.bind(this));
    document.addEventListener('keydown', this.keydown.bind(this));

    // this.shadowRoot.addEventListener('nav-link-click', ev => {
    //   console.log('dkljdakjh hjk')
    // }, true);
  }  

  // previous() {
  //   //store.dispatch(setSlideshowPhotoIdToPrevious());
  //   const customEvent = new CustomEvent('nav-action', { detail: 'previous' });
  //   this.shadowRoot.dispatchEvent(customEvent);
  // };

  // next() {
  //   //store.dispatch(setSlideshowPhotoIdToNext());
  //   const customEvent = new CustomEvent('nav-action', { detail: 'next' });
  //   this.shadowRoot.dispatchEvent(customEvent);
  // };

  // close() {
  //   //store.dispatch(setSlideshowPhotoId(null));
  //   const customEvent = new CustomEvent('nav-action', { detail: 'close' });
  //   this.shadowRoot.dispatchEvent(customEvent);
  // };

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