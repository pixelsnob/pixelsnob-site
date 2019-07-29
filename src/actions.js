

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