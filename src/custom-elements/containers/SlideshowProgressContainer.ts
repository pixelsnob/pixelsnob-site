
import createObserver from '../../createObserver';
import { customElementsDefine } from '../../customElements';

import store from '../../store';

import { setCurrentSlideshowPhotoById } from '../../actions';
import { getSlideshowPhoto, getSlideshowPhotoByListIndex, getSlideshowPhotos } from '../../selectors';
import '../SlideshowProgress';
import '../SlideshowProgressBar';
import '../SlideshowProgressStats';

import SlideshowProgressComponent from '../SlideshowProgress';

class SlideshowProgressContainer extends HTMLElement {

  private $progress: any;
  private storeUnsubscribe?: () => void;

  public connectedCallback() {
    
    this.attachShadow({ mode: 'open' });
    this.$progress = document.createElement('slideshow-progress') as SlideshowProgressComponent;
    this.shadowRoot!.appendChild(this.$progress);
    this.$progress.appendChild(document.createElement('div'));
    this.$progress.addEventListener('progress-update-photo-by-index', this.updatePhotoByIndex.bind(this));

    this.storeUnsubscribe = createObserver(store)(
      state => ({ slideshowPhotos: state.slideshowPhotos }),
      (state) => {
        this.updateProgress(state);
      }
    );
  }

  public disconnectedCallback() {
    this.$progress.removeEventListener('progress-update-photo-by-index', this.updatePhotoByIndex.bind(this));
    if (this.storeUnsubscribe) {
      this.storeUnsubscribe();
    }
  }

  private updateProgress(state: State) {
    const slideshowPhoto = getSlideshowPhoto(state);
    const slideshowPhotos: SlideshowPhoto[] = getSlideshowPhotos(state);

    let listIndex = 0;

    if (slideshowPhoto) {
      listIndex = slideshowPhoto.listIndex;
      
    }
    this.$progress.setAttribute('current-index', listIndex);
    this.$progress.setAttribute('list-length', slideshowPhotos.length);
  }

  private updatePhotoByIndex = (ev: CustomEvent) => {
    ev.preventDefault();
    const slideshowPhotos = getSlideshowPhotos(store.getState());
    if (slideshowPhotos && ev.detail.photoListIndex) {
      const photo = getSlideshowPhotoByListIndex(ev.detail.photoListIndex)(store.getState());
      if (photo) {
        store.dispatch(setCurrentSlideshowPhotoById(photo.id));
      }
    }
  }

}

customElementsDefine('slideshow-progress-container', SlideshowProgressContainer);

export default SlideshowProgressContainer;

