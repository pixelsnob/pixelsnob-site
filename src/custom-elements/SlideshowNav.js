

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

  static get observedAttributes() {
    return [ 'photo-loading' ];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._removeTouch = touch(document, this.ontouch.bind(this));
    document.addEventListener('keydown', this.keydown.bind(this));
    this.shadowRoot.addEventListener('nav-action', this._onNavActon.bind(this), true);
  }  

  disconnectedCallback() {
    document.removeEventListener('keydown', this.keydown.bind(this));
    this.shadowRoot.removeEventListener('nav-action', this._onNavActon.bind(this), true);

    this._removeTouch(); /////////
  }

  _onNavActon(ev) {
    switch(ev.detail.action) {
      case 'previous':
        this.previous();
      break;
      case 'next':
        this.next();
      break;
      case 'close':
        this.close();
      break;
    }
  }

  previous() {
    const customEvent = new CustomEvent('nav-action', { detail: { action: 'previous' }});
    this.dispatchEvent(customEvent);
  };

  next() {
    const customEvent = new CustomEvent('nav-action', { detail: { action: 'next' }});
    this.dispatchEvent(customEvent);
  };

  close() {
    const customEvent = new CustomEvent('nav-action', { detail: { action: 'close' }});
    this.dispatchEvent(customEvent);
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
    //store.dispatch(enableTouch());
    switch (touchEventName) {
      case 'left':
        this.next();
        break;
      case 'right':
        this.previous();
        break;
    }
  }



}