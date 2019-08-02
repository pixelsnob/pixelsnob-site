
import store from './store';
import { setImageLoaded } from './actions';

export default function(src, $img) {
  return new Promise((resolve, reject) => {
    const isImageLoaded = store.getState().loadedImages.find(image => image === src);

    if (isImageLoaded) {
      resolve();
      $img.src = src;
    } else {
      const tmpImg = new Image;
      tmpImg.onload = () => {
        tmpImg.onload = null;
        // Add to image cache
        store.dispatch(setImageLoaded(src));
        resolve();
      }
      tmpImg.src = src;
      $img.src = src;
    }
  })
};
