
import { createSelector } from 'reselect';

const slideshowPhotoIdSelector = state => state.slideshowPhotoId;
const slideshowPhotosSelector = state => state.slideshowPhotos;

export const getSlideshowPhoto = createSelector([
  slideshowPhotoIdSelector,
  slideshowPhotosSelector
], (slideshowPhotoId, slideshowPhotos) => {
  return slideshowPhotos.find(photo => photo.id === slideshowPhotoId);
});

export const getSlideshowPhotos = createSelector([
  slideshowPhotosSelector
], (slideshowPhotos) => {
  return slideshowPhotos;
});