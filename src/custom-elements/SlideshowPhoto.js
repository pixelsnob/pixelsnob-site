
import store from '../store';
import createObserver from '../createObserver';
import preloadImage from '../preloadImage';
import { getSlideshowPhoto } from '../selectors';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  opacity: 0;
  text-align: center;
  vertical-align: middle;
  transition: opacity 0.2s ease-in-out;
  margin-top: 3vh;
}
:host(.photo-visible) {
  opacity: 1;
}
img {
  display: inline;
  max-height: 80vh;
  /* align-self: middle;
  @media (max-width: $breakpoint-md) and (orientation: portrait) {
    max-height: 80vh;
  } */
  max-width: 100vw;
  object-fit: contain;
  overflow: hidden;
}

</style>
`;

export default class SlideshowPhoto extends HTMLElement {

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.update();
    this._storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotoId: state.slideshowPhotoId }),
      (key, value) => {
        this.update(value);
      }
    );
    
  }

  disconnectedCallback() {
    this.classList.remove('photo-visible');
    this._storeUnsubscribe();
  }

  update(slideshowPhotoId) {
    if (slideshowPhotoId !== this.dataset.id) {
      this.className = '';
      return null;
    }
    
    const currentPhoto = getSlideshowPhoto({ ...store.getState(), slideshowPhotoId });
    if (!currentPhoto) {
      this.className = '';
      return null;
    }

    let img = this.shadowRoot.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      this.shadowRoot.appendChild(img);
      img.setAttribute('data-src', currentPhoto.src);
      img.setAttribute('alt', currentPhoto.title);
    }
    
    preloadImage(currentPhoto.src, img).then(() => {
      // The current id could have changed by the time this loads
      if (store.getState().slideshowPhotoId === slideshowPhotoId) {
        this.className = 'photo-visible';
      } else {
        this.className = '';
      }
    });
  }
}
