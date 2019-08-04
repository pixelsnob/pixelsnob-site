
import { createSelector } from 'reselect';

const slideshowPhotoIdSelector = state => state.slideshowPhotoId;
const slideshowPhotosSelector = state => state.slideshowPhotos;
const listIndexSelector = state => state.listIndex;

export const getSlideshowPhoto = createSelector([
  slideshowPhotoIdSelector,
  slideshowPhotosSelector
], (slideshowPhotoId, slideshowPhotos) => {
  return slideshowPhotos.find(photo => photo.id === slideshowPhotoId);
});

export const getSlideshowPhotoByListIndex = createSelector([
  slideshowPhotosSelector,
  listIndexSelector
], (slideshowPhotos, listIndex) => {
  return slideshowPhotos.find(photo => photo.listIndex === listIndex);
});

export const getSlideshowPhotos = createSelector([
  slideshowPhotosSelector
], (slideshowPhotos) => {
  return slideshowPhotos;
});