
import { setImageLoaded } from './actions';
import store from './store';

export default function(src: string, $img: HTMLImageElement) {
  return new Promise((resolve) => {
    const isImageLoaded = store.getState().loadedImages.find((image: LoadedImage) =>image.src === src);

    if (isImageLoaded) {
      resolve();
      $img.src = src;
    } else {
      const tmpImg: HTMLImageElement = new Image;
      tmpImg.onload = () => {
        tmpImg.onload = null;
        store.dispatch(setImageLoaded(src));
        resolve();
      }
      tmpImg.src = src;
      $img.src = src;
    }
  })
};
