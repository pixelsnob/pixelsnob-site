
import { createSelector } from 'reselect';

const slideshowPhotoIdSelector = (state: State) => state.currentSlideshowPhoto ? state.currentSlideshowPhoto.id : null;
const slideshowPhotosSelector = (state: State) => state.slideshowPhotos;


export const getSlideshowPhoto = createSelector([
  slideshowPhotoIdSelector,
  slideshowPhotosSelector
], (slideshowPhotoId, slideshowPhotos: SlideshowPhoto[]) => {
  return slideshowPhotos.find(photo => photo.id === slideshowPhotoId);
});

export const getSlideshowPhotoByListIndex = (listIndex: number) => createSelector([
  slideshowPhotosSelector
], (slideshowPhotos: SlideshowPhoto[]) => {
  return slideshowPhotos[listIndex];
});

export const getSlideshowPhotos = createSelector([
  slideshowPhotosSelector
], (slideshowPhotos: SlideshowPhoto[]) => {
  return slideshowPhotos;
});