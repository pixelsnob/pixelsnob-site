
const defaultState = {
  overlayTemplateId: null,
  slideshowPhotoId: null,
  slideshowPhotos: []
};

function appReducer(state = defaultState, action) {
  switch (action.type) {

    case 'SET_SLIDESHOW_PHOTO_ID': {// current photo/object
      if (action.id) {
        return { ...state, overlayShow: true, slideshowPhotoId: action.id };
      }
      return { ...state, overlayShow: false, slideshowPhotoId: null };
    }

    case 'SET_SLIDESHOW_PHOTOS': {
      if (action.photos) {
        return { ...state, slideshowPhotos: action.photos };
      }
      return state;
    }

    case 'SET_SLIDESHOW_PHOTO_ID_TO_PREVIOUS': {
      if (!state.slideshowPhotos.length) {
        return state;
      }
      const currentPhoto = state.slideshowPhotos.find((photo => photo.id === state.slideshowPhotoId));
      if (currentPhoto) {
        const previousPhoto = state.slideshowPhotos[currentPhoto.listIndex - 1];
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
      const currentPhoto = state.slideshowPhotos.find((photo => photo.id === state.slideshowPhotoId));
      if (currentPhoto) {
        const nextPhoto = state.slideshowPhotos[currentPhoto.listIndex + 1];
        if (nextPhoto) {
          return { ...state, slideshowPhotoId: nextPhoto.id };
        }
      }

      return state;
    }

    default:
      return state;
  }
}

export default appReducer;