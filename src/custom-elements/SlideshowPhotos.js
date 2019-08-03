import store from '../store';
import createObserver from '../createObserver';

export default class SlideshowPhotos extends HTMLElement {

  constructor() {
    super();
    console.log('sdasd')
    const loadingProgress = document.createElement('loading-progress');
    //loadingProgress.classList.add('loading-progress');
    this.appendChild(loadingProgress);
  }

  connectedCallback() {
    const photos = store.getState().slideshowPhotos;
    const loadingProgress = this.querySelector('.loading-progress');
    photos.forEach((photo, i) => {
      const $photo = document.createElement('slideshow-photo');
      this.appendChild($photo);
      $photo.setAttribute('data-id', photo.id);
    });
    // this._storeUnsubscribe = createObserver(store)(
    //   state => ({ slideshowPhotoId: state.slideshowPhotoId }),
    //   (slideshowPhotoId) => {
    //     if (slideshowPhotoId) {
    //       //this.showLoadingProgress();
    //       //this.querySelector('.loading-progress')
    //     }
    //     //console.log('dsal')
    //     // if (overlayShow) {
    //     //   this.classList.add('site-overlay-visible');
    //     //   document.body.classList.add('no-scroll');
    //     // } else {
    //     //   document.body.classList.remove('no-scroll');
    //     //   this.classList.remove('site-overlay-visible');
    //     // }
    //   }
    // );
  }
}