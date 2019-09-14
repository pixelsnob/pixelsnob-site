
interface Window {
  ShadyCSS: any;
}

interface SlideshowPhoto {
  readonly id: number;
  readonly src: string;
  readonly src_small: string;
  readonly title: string;
  readonly flickr_page_url: string;
  readonly dominantColor: string;
}

interface LoadedImage {
  readonly id: number;
  readonly src: string;
}

interface State {
  readonly [key: string]: any;
  readonly currentSlideshowPhoto: SlideshowPhoto | null;
  readonly loadedImages: LoadedImage[];
  readonly slideshowPhotos: SlideshowPhoto[];
  readonly touchEnabled: boolean;
  readonly showOverlay: boolean;
}

interface Store {
  readonly subscribe: (callback: () => void) => () => void;
  readonly getState: () => State;
  readonly dispatch: (action: object) => {}; // action type?
}

declare module 'lodash.debounce';
declare module 'lodash.throttle';
declare module 'customElements';

// declare module "./_data/flickr-photos.json" {
  
// }

type PossiblyAbstractConstructor<T> = Function & { prototype: T };

declare module "*.json" {
  const value: any;
  export default value;
}