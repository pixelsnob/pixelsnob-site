
class PhotosListPhoto extends HTMLElement {
  
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('click', evt => {
      evt.preventDefault();
      document.dispatchEvent(new CustomEvent('photos-list-click', {
        detail: { id: this.dataset.id }
      }));
    });
  }
}

class SiteOverlay extends HTMLElement {
  
  constructor() {
    super();
  }

  connectedCallback() {
    
    document.addEventListener('site-overlay-show', evt => {
      this.classList.add('site-overlay-visible');  
      const siteOverlayContent = this.querySelector('.site-overlay-content');
      if (evt.detail.template && siteOverlayContent && !siteOverlayContent.childElementCount) {
        siteOverlayContent.appendChild(evt.detail.template);
      }
      // Close and remove content
      this.querySelector('.site-overlay-close').addEventListener('click', ev => {
        this.classList.remove('site-overlay-visible');
        document.dispatchEvent(new CustomEvent('site-overlay-hide'));
      });
    });
    // add close removeEventListeners
  }
}

class SlideshowPhotos extends HTMLElement {
  
  constructor() {
    super();
  }

  connectedCallback() {
    const photos = this.querySelectorAll('slideshow-photo');
    
    photos.forEach((photo, i) => {
      photo.setAttribute('data-list-index', i);
    });

    document.addEventListener('slideshow-photos-show', evt => {
      this.setAttribute('current-id', evt.detail.id);
    });

    document.addEventListener('slideshow-photos-show-next', evt => {
      const current = this.querySelector(`slideshow-photo[data-id="${evt.detail.id}"]`);
      if (current) {
        if (!current.dataset.listIndex) {
          return null;
        }
        const next = this.querySelector(`slideshow-photo[data-list-index="${Number(current.dataset.listIndex) + 1}"]`);
        if (next) {
          this.setAttribute('current-id', next.dataset.id);
        }
      }
    });
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
          this.style.left = `calc(-${i} * 100vw)`;
          document.dispatchEvent(new CustomEvent('slideshow-photo-show', {
            detail: { id: newVal }
          }));
        }
      break;
    }
  }
}

class SlideshowPhoto extends HTMLElement {
  
  constructor() {
    super();    
  }

  connectedCallback() {
    this.addEventListener('click', evt => {
      document.dispatchEvent(new CustomEvent('slideshow-photo-click', {
        detail: { id: this.dataset.id, listIndex: this.dataset.listIndex }
      }));
      evt.preventDefault();
      evt.stopPropagation();
    });

    document.addEventListener('slideshow-photo-show', evt => {
      if (this.dataset.id === evt.detail.id) {
        this.classList.add('photo-visible');
        const img = new Image;
        img.src = this.dataset.backgroundImage;
        img.className = 'img-hidden';
        img.onload = function(evt) {
          img.className = 'img-active';
        };
        this.appendChild(img);
      } else {
        this.classList.remove('photo-visible');
      }
    });

    document.addEventListener('slideshow-photo-hide', evt => {
      const img = this.querySelector('img');
      this.classList.remove('photo-visible');
      if (img) {
        img.remove();
      }
    });
  }
}