
const defaultState: State = {
  currentSlideshowPhoto: null,
  loadedImages: [],
  showOverlay: false,
  slideshowPhotos: [],
  touchEnabled: false
};

function appReducer(state: State = defaultState, action: any) {

  switch (action.type) {

    case 'SET_SLIDESHOW_PHOTOS': {
      
      if (action.photos) {
        return { ...state, slideshowPhotos: action.photos };
      }
      return state;
    }

    case 'SET_CURRENT_SLIDESHOW_PHOTO_BY_ID': {
      if (action.id) {
        const currentSlideshowPhoto = state.slideshowPhotos.length ?
          state.slideshowPhotos.find((photo) => photo.id === action.id) : null;
        if (currentSlideshowPhoto) {
          return { ...state, currentSlideshowPhoto };
        }
      }
      return { ...state, currentSlideshowPhoto: null };
    }

    case 'SET_SLIDESHOW_PHOTO_TO_PREVIOUS': { /// confusing name
      if (!state.currentSlideshowPhoto || !state.slideshowPhotos.length) {
        return state;
      }
      const currentIndex = state.slideshowPhotos.indexOf(state.currentSlideshowPhoto);
      const previousPhoto = state.slideshowPhotos[currentIndex - 1];

      if (previousPhoto) {
        return { ...state, currentSlideshowPhoto: previousPhoto };
      }
      return state;
    }

    case 'SET_SLIDESHOW_PHOTO_TO_NEXT': { /// confusing name
      if (!state.currentSlideshowPhoto || !state.slideshowPhotos.length) {
        return state;
      }
      const currentIndex = state.slideshowPhotos.indexOf(state.currentSlideshowPhoto);
      const nextPhoto = state.slideshowPhotos[currentIndex + 1];

      if (nextPhoto) {
        return { ...state, currentSlideshowPhoto: nextPhoto };
      }
      return state;
    }

    case 'ADD_LOADED_IMAGE': {
      if (action.imageSrc) {
        return { ...state, loadedImages: [ ...state.loadedImages, action.imageSrc ] };
      }
      return state;
    }

    case 'SHOW_OVERLAY': {
      return { ...state, showOverlay: true };
    }
    
    case 'HIDE_OVERLAY': {
      return { ...state, showOverlay: false };
    }
    
    default: {
      return state;
    }
  }
}

export default appReducer;