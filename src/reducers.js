
const defaultState = {
  overlayTemplateId: null,
  slideshowPhotoId: null,
  slideshowPhotos: []
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
        return { ...state, slideshowPhotos: action.photos };
      }
      return state;
    }

    default:
      return state;
  }
}

export default appReducer;