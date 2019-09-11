

import throttle from 'lodash.throttle';
import { component } from '../decorators';
import touch from '../touch';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  height: 70px;
  width: 100%;
  opacity: 1;
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

</style>

<div class="photos-slideshow-nav">
  <slideshow-nav-link action="previous"><a slot="nav-link">&#x2190;</a></slideshow-nav-link>
  <slideshow-nav-link action="close"><a slot="nav-link">&times;</a></slideshow-nav-link>
  <slideshow-nav-link action="next"><a slot="nav-link">&#x2192;</a></slideshow-nav-link>
</div>`;

@component('slideshow-nav', template)
export default class SlideshowNavComponent extends HTMLElement {

  private boundOnKeydown: (ev: Event) => {};
  private boundOnNavAction: (ev: Event) => {};
  private removeTouch: any;

  constructor() {
    super();
    this.boundOnKeydown = throttle(this._onKeydown.bind(this), 50);
    this.boundOnNavAction = throttle(this._onNavActon.bind(this), 50);
    this.removeTouch = null;
  }

  public connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    this.removeTouch = touch(document.body, this._onTouch.bind(this));
    document.addEventListener('keydown', this.boundOnKeydown);
    this.shadowRoot!.addEventListener('nav-action', this.boundOnNavAction, true);
  }  

  public disconnectedCallback() {
    document.removeEventListener('keydown', this.boundOnKeydown);
    this.shadowRoot!.removeEventListener('nav-action', this.boundOnNavAction, true);
    this.shadowRoot!.removeEventListener('keydown', this.boundOnKeydown, true);
    if (this.removeTouch) {
      this.removeTouch();
    }
  }

  private _onNavActon(ev: CustomEvent) {
    switch(ev.detail.action) {
      case 'previous':
        this.dispatchNavActionEvent('previous');
        break;
      case 'next':
        this.dispatchNavActionEvent('next');
        break;
      case 'close':
        this.dispatchNavActionEvent('close');
        break;
    }
  }
  
  private dispatchNavActionEvent(action: string) {
    const customEvent = new CustomEvent('nav-action', { detail: { action }});
    this.dispatchEvent(customEvent);
  }

  private _onKeydown(ev: KeyboardEvent) {    
    switch(ev.keyCode) {
      case 37:
      case 38:
        this.dispatchNavActionEvent('previous');
      break;
      case 39:
      case 40:
        this.dispatchNavActionEvent('next');
      break;
      case 27:
        this.dispatchNavActionEvent('close');
      break;
    }
  }

  private _onTouch(touchEventName: string) {
    switch (touchEventName) {
      case 'left':
        this.dispatchNavActionEvent('next');
      break;
      case 'right':
          this.dispatchNavActionEvent('previous');
        break;
    }
  }
}
