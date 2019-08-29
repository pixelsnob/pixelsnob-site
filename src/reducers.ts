import { getNextSlideshowPhoto, getPreviousSlideshowPhoto, getSlideshowPhoto } from './selectors';

const defaultState: State = {
  currentSlideshowPhoto: null,
  loadedImages: [],
  slideshowPhotos: [],
  touchEnabled: false
};

function appReducer(state: State = defaultState, action: any) {
  switch (action.type) {


    case 'SET_SLIDESHOW_PHOTOS': {
      
      if (action.photos) {
        if (action.photos.find((photo: SlideshowPhoto) => state.currentSlideshowPhoto && photo.id === state.currentSlideshowPhoto.id)) {
          return { ...state, slideshowPhotos: action.photos };
        } else {
          // Current photo is no longer in photos list: close slideshow
          return { ...state, slideshowPhotos: action.photos, overlayShow: false };
        }
      }
      return state;
    }

    case 'SET_CURRENT_SLIDESHOW_PHOTO_BY_ID': {
      if (action.id) {
        const currentSlideshowPhoto = state.slideshowPhotos.length ?
          state.slideshowPhotos.find((photo) => photo.id === action.id) : null;
        if (currentSlideshowPhoto) {
          return { ...state, overlayShow: true, currentSlideshowPhoto };
        }
      }
      return { ...state, overlayShow: false, currentSlideshowPhoto: null };
    }

    
    case 'SET_SLIDESHOW_PHOTO_ID_TO_PREVIOUS': {
      if (!state.slideshowPhotos.length || !state.currentSlideshowPhoto) {
        return state;
      }
      const previousPhoto = getPreviousSlideshowPhoto(state);
      if (previousPhoto) {
        return { ...state, currentSlideshowPhoto: { ...previousPhoto }};
      }
      return state;
    }

    case 'SET_SLIDESHOW_PHOTO_ID_TO_NEXT': {
      if (!state.slideshowPhotos.length) {
        return state;
      }
      const nextPhoto = getNextSlideshowPhoto(state);
      if (nextPhoto) {
        return { ...state, currentSlideshowPhoto: { ...nextPhoto }};
      }
      return state;
    }

    case 'ADD_LOADED_IMAGE': {
      if (action.imageSrc) {
        return { ...state, loadedImages: [ ...state.loadedImages, action.imageSrc ] };
      }
      return state;
    }

    // case 'ENABLE_TOUCH': {
    //   return { ...state, touchEnabled: true };
    // }
    
    default: {
      return state;
    }
  }
}

export default appReducer;