
class PhotosListPhoto extends HTMLElement {
  
  connectedCallback() {
    this.addEventListener('click', evt => {
      evt.preventDefault();
      document.dispatchEvent(new CustomEvent('photos-list-click', {
        detail: { id: this.dataset.id }
      }));
      // console.log(evt)
      // const input = document.createElement('input');
      // input.type = 'hidden';
      // input.value = evt.target.dataset.id;
      // input.classList.add('selected-photo');
      // this.appendChild(input);
    });
  }
}


class SiteOverlay extends HTMLElement {

  connectedCallback() {
    
    document.addEventListener('site-overlay-show', evt => {
      this.classList.add('site-overlay-visible');  
      const siteOverlayContent = this.querySelector('.site-overlay-content');
      if (evt.detail.template && siteOverlayContent && !siteOverlayContent.childElementCount) {
        siteOverlayContent.appendChild(evt.detail.template);
        document.dispatchEvent(new CustomEvent('site-overlay-shown'));
      }
    });
    
    document.addEventListener('site-overlay-hide', evt => {
      this.classList.remove('site-overlay-visible');
    });
    
  }
}


class SlideshowPhotos extends HTMLElement {

  showPreviousPhoto(evt) {
    const current = this.querySelector(`slideshow-photo.photo-visible`);
    if (current) {
      if (!current.dataset.listIndex) {
        return null;
      }
      const prevIndex = Number(current.dataset.listIndex) - 1;
      if (prevIndex < 0) {
        return null;
      }
      const previous = this.querySelector(`slideshow-photo[data-list-index="${prevIndex}"]`);
      if (previous) {
        this.setAttribute('current-id', previous.dataset.id);
      }
    }
  };

  showNextPhoto(evt) {
    const current = this.querySelector(`slideshow-photo.photo-visible`);
    if (current) {
      if (!current.dataset.listIndex) {
        return null;
      }
      const nextIndex = Number(current.dataset.listIndex) + 1;
      const photoCount = this.querySelectorAll('slideshow-photo').length;
      if (nextIndex > photoCount) {
        return null;
      }
      const next = this.querySelector(`slideshow-photo[data-list-index="${nextIndex}"]`);
      if (next) {
        this.setAttribute('current-id', next.dataset.id);
      }
    }
  };

  connectedCallback() {
    const photos = this.querySelectorAll('slideshow-photo');    
    photos.forEach((photo, i) => {
      photo.setAttribute('data-list-index', i);
    });
    document.addEventListener('slideshow-photos-show', evt => {
      this.setAttribute('current-id', evt.detail.id);
    });
    document.addEventListener('slideshow-photos-show-previous', this.showPreviousPhoto.bind(this));
    document.addEventListener('slideshow-photos-show-next', this.showNextPhoto.bind(this));

  }

  static get observedAttributes() {
    return [ 'current-id' ];
  }

  get currentId() {
    return this.getAttribute('current-id');
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case 'current-id':
        
        const current = this.querySelector(`slideshow-photo[data-id="${newVal}"]`);
        if (current) {
          // Move the entire container to the left/right so it shows current image
          const i = current.getAttribute('data-list-index');
          //console.log('current index is ', i)
          this.style.left = `calc(-${i} * 100vw)`;
          document.dispatchEvent(new CustomEvent('slideshow-photo-show', {
            detail: { id: newVal }
          }));
        }
      break;
    }
  }

  disconnectedCallback() {
    document.removeEventListener('slideshow-photos-show-previous', this.showPreviousPhoto.bind(this));
    document.removeEventListener('slideshow-photos-show-next', this.showNextPhoto.bind(this));
  }
}


class SlideshowNav extends HTMLElement {

  connectedCallback() {
    const previousLink = this.querySelector('.photos-slideshow-nav-container .previous a');
    if (previousLink) {
      previousLink.addEventListener('click', this.previousOnclick.bind(this));
    }
    const nextLink = this.querySelector('.photos-slideshow-nav-container .next a');
    if (nextLink) {
      nextLink.addEventListener('click', this.nextOnclick.bind(this));
    }
    const closeLink = this.querySelector('.photos-slideshow-nav-container .close a');
    if (closeLink) {
      closeLink.addEventListener('click', this.closeOnclick.bind(this));
    } 
  }  

  disconnectedCallback() {
    const previousLink = this.querySelector('.photos-slideshow-nav-container .previous a');
    if (previousLink) {
      previousLink.removeEventListener('click', this.previousOnclick.bind(this));
    }
    const nextLink = this.querySelector('.photos-slideshow-nav-container .next a');
    if (nextLink) {
      nextLink.removeEventListener('click', this.nextOnclick.bind(this));
    }
    const closeLink = this.querySelector('.photos-slideshow-nav-container .close a');
    if (closeLink) {
      closeLink.removeEventListener('click', this.closeOnclick.bind(this));
    } 
  }  

  previousOnclick(evt) {
    document.dispatchEvent(new CustomEvent('slideshow-photos-show-previous'));
  };

  nextOnclick(evt) {
    document.dispatchEvent(new CustomEvent('slideshow-photos-show-next'));

  };

  closeOnclick(evt) {
    document.dispatchEvent(new CustomEvent('slideshow-photos-hide'));
  };

}


class SlideshowPhoto extends HTMLElement {

  showPhoto(evt) {
    const existingImg = this.querySelector('img');
    if (this.dataset.id === evt.detail.id) {
      this.classList.add('photo-visible');
      if (existingImg) {
        this.appendChild(existingImg);
      } else {
        const img = new Image;
        img.src = this.dataset.backgroundImage;
        img.className = 'img-hidden';
        img.onload = function(evt) {
          img.className = 'img-active';
        };
        this.appendChild(img);
      }
    } else {
      this.hidePhoto();
    }
  }

  hidePhoto(evt) {
    const img = this.querySelector('img');
    this.classList.remove('photo-visible');
    if (img) {
      img.remove();
    }
  }

  connectedCallback() {
    document.addEventListener('slideshow-photo-show', this.showPhoto.bind(this));
    document.addEventListener('slideshow-photo-hide', this.hidePhoto.bind(this));
  }

  disconnectedCallback() {
    document.removeEventListener('slideshow-photo-show', this.showPhoto.bind(this));
    document.removeEventListener('slideshow-photo-hide', this.hidePhoto.bind(this));
    this.classList.remove('photo-visible');
  }
}
