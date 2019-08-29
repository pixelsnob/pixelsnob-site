
import { createSelector } from 'reselect';

const slideshowPhotoIdSelector = (state: State) => state.currentSlideshowPhoto ? state.currentSlideshowPhoto.id : null;/////
const slideshowPhotosSelector = (state: State) => state.slideshowPhotos;
const currentSlideshowPhotoSelector = (state: State) => state.currentSlideshowPhoto;

export const getSlideshowPhoto = createSelector([
  slideshowPhotoIdSelector,
  slideshowPhotosSelector
], (slideshowPhotoId, slideshowPhotos: SlideshowPhoto[]) => {
  return slideshowPhotos.find(photo => photo.id === slideshowPhotoId);
});

export const getPreviousSlideshowPhoto = createSelector([
  slideshowPhotosSelector,
  currentSlideshowPhotoSelector
], (slideshowPhotos: SlideshowPhoto[], currentSlideshowPhoto: SlideshowPhoto | null) => {
  return slideshowPhotos.find(photo => currentSlideshowPhoto && photo.listIndex === currentSlideshowPhoto.listIndex - 1);
});

export const getNextSlideshowPhoto = createSelector([
  slideshowPhotosSelector,
  currentSlideshowPhotoSelector
], (slideshowPhotos: SlideshowPhoto[], currentSlideshowPhoto: SlideshowPhoto | null) => {
  return slideshowPhotos.find(photo => currentSlideshowPhoto && photo.listIndex === currentSlideshowPhoto.listIndex + 1);
});

export const getSlideshowPhotos = createSelector([
  slideshowPhotosSelector
], (slideshowPhotos: SlideshowPhoto[]) => {
  return slideshowPhotos;
});