import store from '../store';


export default class SlideshowPhotos extends HTMLElement {

  constructor() {
    super();
    // // Load photos json into store, add index #
    // const photos = photosJson.map((photo, listIndex) => {
    //   return {
    //     id: photo.id,
    //     listIndex,
    //     src: photo.url_o,
    //     title: photo.title
    //   };
    // });
    // store.dispatch(setSlideshowPhotos(photos));
  }

  connectedCallback() {
    const photos = store.getState().slideshowPhotos;
    photos.forEach((photo, i) => {
      const $photo = document.createElement('slideshow-photo');
      this.appendChild($photo);
      $photo.setAttribute('data-id', photo.id);
    });
  }
}