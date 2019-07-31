import store from '../store';
import { setSlideshowPhotos } from '../actions';

export default class SlideshowPhotos extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    // Load data from existing html into store
    const photos = Array.from(this.querySelectorAll('slideshow-photo'));
    const photosData = photos.map((photo, listIndex) => {
      const existingImg = photo.querySelector('img');
      return {
        id: photo.dataset.id,
        listIndex,
        src: existingImg.dataset.src
      };
    });
    store.dispatch(setSlideshowPhotos(photosData));

  }
}