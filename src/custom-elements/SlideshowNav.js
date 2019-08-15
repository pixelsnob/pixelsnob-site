

import touch from '../touch';
import throttle from 'lodash/throttle';

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
    this._boundOnKeydown = throttle(this._onKeydown.bind(this), 40);
    this._boundOnNavAction = throttle(this._onNavActon.bind(this), 40);
    document.addEventListener('keydown', this._boundOnKeydown);
    this.shadowRoot.addEventListener('nav-action', this._boundOnNavAction, true);
  }  

  disconnectedCallback() {
    document.removeEventListener('keydown', this._boundKeydown);
    this.shadowRoot.removeEventListener('nav-action', this._boundOnNavAction, true);
    this.shadowRoot.removeEventListener('keydown', this._boundOnKeydown, true);

    this._removeTouch(); /////////
  }

  _onNavActon(ev) {
    switch(ev.detail.action) {
      case 'previous':
        this._dispatchNavActionEvent('previous');
        break;
      case 'next':
        this._dispatchNavActionEvent('next');
        break;
      case 'close':
        this._dispatchNavActionEvent('close');
        break;
    }
  }
  

  _dispatchNavActionEvent(action) {
    const customEvent = new CustomEvent('nav-action', { detail: { action }});
    this.dispatchEvent(customEvent);
  }

  _onKeydown(evt) {    
    switch(evt.keyCode) {
      case 37:
      case 38:
        this._dispatchNavActionEvent('previous');
      break;
      case 39:
      case 40:
        this._dispatchNavActionEvent('next');
      break;
      case 27:
        this._dispatchNavActionEvent('close');
      break;
    }
  }

  ontouch(touchEventName) {
    //store.dispatch(enableTouch());//////////////////////
    switch (touchEventName) {
      case 'left':
        this._dispatchNavActionEvent('previous');
      break;
      case 'right':
          this._dispatchNavActionEvent('next');
        break;
    }
  }
}