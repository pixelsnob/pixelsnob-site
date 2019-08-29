
export const setCurrentSlideshowPhotoById = (id: number) => {
  return {
    id,
    type: 'SET_CURRENT_SLIDESHOW_PHOTO_BY_ID',
  };
};

export const setSlideshowPhotos = (photos: SlideshowPhoto[]) => {
  return {
    photos,
    type: 'SET_SLIDESHOW_PHOTOS',
    
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

export const setImageLoaded = (imageSrc: string) => {
  return {
    imageSrc,
    type: 'ADD_LOADED_IMAGE'
  };
};

export const enableTouch = () => {
  return {
    type: 'ENABLE_TOUCH'
  };
};