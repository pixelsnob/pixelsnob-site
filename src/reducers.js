
import { getSlideshowPhoto, getSlideshowPhotoByListIndex } from './selectors';

const defaultState = {
  slideshowPhotoId: null,
  slideshowPhotos: [],
  loadedImages: [],
  touchEnabled: false
};

function appReducer(state = defaultState, action) {
  
  switch (action.type) {

    case 'SET_SLIDESHOW_PHOTO_ID': {
      if (action.id) {
        return { ...state, overlayShow: true, slideshowPhotoId: action.id };
      }
      return { ...state, overlayShow: false, slideshowPhotoId: null };
    }

    case 'SET_SLIDESHOW_PHOTOS': {
      if (action.photos) {
        if (action.photos.find(photo => photo.id === state.slideshowPhotoId)) {
          return { ...state, slideshowPhotos: action.photos };
        } else {
          return { ...state, slideshowPhotos: action.photos, overlayShow: false, slideshowPhotoId: null };
        }
      }
      return state;
    }

    case 'SET_SLIDESHOW_PHOTO_ID_TO_PREVIOUS': {
      if (!state.slideshowPhotos.length) {
        return state;
      }
      const currentPhoto = getSlideshowPhoto(state);
      if (currentPhoto) {
        const previousPhoto = getSlideshowPhotoByListIndex({ ...state, listIndex: currentPhoto.listIndex - 1 });
        if (previousPhoto) {
          return { ...state, slideshowPhotoId: previousPhoto.id };
        }
      }
      return state;
    }

    case 'SET_SLIDESHOW_PHOTO_ID_TO_NEXT': {
      if (!state.slideshowPhotos.length) {
        return state;
      }

      const currentPhoto = getSlideshowPhoto(state);
      if (currentPhoto) {
        const nextPhoto = getSlideshowPhotoByListIndex({ ...state, listIndex: currentPhoto.listIndex + 1 });
        if (nextPhoto) {
          return { ...state, slideshowPhotoId: nextPhoto.id };
        }
      }

      return state;
    }

    case 'ADD_LOADED_IMAGE': {
      if (action.imageSrc) {
        return { ...state, loadedImages: [ ...state.loadedImages, action.imageSrc ] };
      }
      return state;
    }

    case 'ENABLE_TOUCH': {
      return { ...state, touchEnabled: true };
    }
    
    default: {
      return state;
    }
  }
}

export default appReducer;