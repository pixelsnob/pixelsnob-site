
class PhotosListPhoto extends HTMLElement {
  
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('click', evt => {
      evt.preventDefault();
      document.dispatchEvent(new CustomEvent('slideshow-open', {
        detail: { template: 'slideshow-template' }
      }));
      document.dispatchEvent(new CustomEvent('slideshow-show-photo', {
        detail: { id: this.dataset.id }
      }));
    });
  }
}

class SlideshowPhoto extends HTMLElement {
  
  constructor() {
    super();    
  }

  connectedCallback() {
    document.addEventListener('slideshow-show-photo', evt => {
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

    document.addEventListener('slideshow-hide-photo', evt => {
      const img = this.querySelector('img');
      this.classList.remove('photo-visible');
      if (img) {
        img.remove();
      }
    });
  }
}

class SiteOverlay extends HTMLElement {
  
  constructor() {
    super();
  }

  connectedCallback() {
    document.addEventListener('slideshow-open', evt => {
      this.classList.add('site-overlay-visible');  
      if (!this.childNodes.length) {
        const template = document.getElementById('slideshow-template').content.cloneNode(true);
        this.appendChild(template);
      }
    });
    
    // Close and remove content
    this.addEventListener('click', ev => {
      this.classList.remove('site-overlay-visible');
      document.dispatchEvent(new CustomEvent('slideshow-hide-photo', {
        detail: { template: 'slideshow-template'
      }}));
    });
  }
}