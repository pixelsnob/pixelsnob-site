
import { component } from '../decorators';
import SlideshowProgressBarComponent from './SlideshowProgressBar';
import SlideshowProgressStatsComponent from './SlideshowProgressStats';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  width: 100%;
}
.progress-container {
  background-color: #444;
  width: 100%;
  height: 25px;
  position: absolute;
  cursor: pointer;
  z-index: 2000;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.progress-container:hover {
  background-color: #666;
}
</style>
<div class="progress-container">
  <slideshow-progress-bar></slideshow-progress-bar>
  <slideshow-progress-stats></slideshow-progress-stats>
</div>
`;

@component('slideshow-progress', template)
export default class SlideshowProgressComponent extends HTMLElement {
  
  private $slideshowProgressStats: any;
  private $slideshowProgressBar: any;

  static get observedAttributes() {
    return [ 'current-index', 'list-length' ];
  }

  public connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    this.shadowRoot!.addEventListener('click', (this.onClick.bind(this)) as EventListener);

    this.$slideshowProgressBar = this.shadowRoot!.querySelector('slideshow-progress-bar') as SlideshowProgressBarComponent;
    this.$slideshowProgressStats = this.shadowRoot!.querySelector('slideshow-progress-stats') as SlideshowProgressStatsComponent;
  }

  get currentIndex(): number {
    const value = this.getAttribute('current-index');
    if (!isNaN(Number(value))) {
      return Number(value);
    }
    return 0;
  }

  set currentIndex(value: number) {
    this.setAttribute('current-index', '' + value);
  }

  get listLength(): number {
    const value = this.getAttribute('list-length');
    if (!isNaN(Number(value))) {
      return Number(value);
    }
    return 0;
  }

  set listLength(value: number) {
    this.setAttribute('list-length', '' + value);
  }

  public attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case 'current-index':
        this.$slideshowProgressBar.currentIndex = newValue;
        this.$slideshowProgressStats.currentIndex = newValue;
        break;
      case 'list-length':
        this.$slideshowProgressBar.listLength = newValue;
        this.$slideshowProgressStats.listLength = newValue;
      break;
    }
  }

  private onClick(ev: MouseEvent) {
    ev.preventDefault();
    const $progressContainer = this.shadowRoot!.querySelector('.progress-container');
    if ($progressContainer && !isNaN(Number(this.listLength))) {
      const photoListIndex = Math.ceil((ev.clientX / $progressContainer.clientWidth) * (this.listLength - 1));
      const customEvent = new CustomEvent('progress-update-photo-by-index', {
        detail: {
          photoListIndex
        }
      });
      this.dispatchEvent(customEvent);
    }
  }
}
