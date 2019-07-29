import store from '../store';
import { setSlideshowPhotos } from '../actions';

export default class SlideshowPhotos extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const photos = Array.from(this.querySelectorAll('slideshow-photo'));
    const photosData = photos.map((photo, listIndex) => {
      const { id/*, title, url_s,*/, url_o/*, date_taken,flickr_page_url*/, urlO } = photo.dataset;
      return {
        id, listIndex, urlO
      };
    });
    // Load data from existing html into store
    store.dispatch(setSlideshowPhotos(photosData));

  }
}