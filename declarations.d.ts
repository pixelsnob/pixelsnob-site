
interface Window {
  ShadyCSS: any;
}

interface SlideshowPhoto {
  readonly id: number;
  readonly listIndex: number;
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
  readonly currentSlideshowPhoto: SlideshowPhoto | null;
  readonly loadedImages: LoadedImage[];
  readonly slideshowPhotos: SlideshowPhoto[];
  readonly touchEnabled: boolean;
}

interface Store {
  readonly subscribe: (callback: () => void) => {};
  readonly getState: () => State;
  readonly dispatch: (action: object) => {}; // action type?
}

