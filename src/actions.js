

export const setSlideshowPhotoId = (id) => {
  return {
    type: 'SET_SLIDESHOW_PHOTO_ID',
    id
  };
};

export const setSlideshowPhotos = (photos) => {
  return {
    type: 'SET_SLIDESHOW_PHOTOS',
    photos
  };
};

export const setSlideshowPhotoIdToPrevious = () => {
  return {
    type: 'SET_SLIDESHOW_PHOTO_ID_TO_PREVIOUS'
  };
};

export const setSlideshowPhotoIdToNext = () => {
  return {
    type: 'SET_SLIDESHOW_PHOTO_ID_TO_NEXT'
  };
};