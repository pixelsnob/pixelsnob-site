
document.addEventListener('photos-list-click', function(evt) {
  const template = document.getElementById('slideshow-template').content.cloneNode(true);
  document.dispatchEvent(new CustomEvent('site-overlay-show', {
    detail: { template }
  }));
  document.dispatchEvent(new CustomEvent('slideshow-photos-show', {
    detail: { id: evt.detail.id }
  }));
});

document.addEventListener('slideshow-photos-hide', evt => {
  document.dispatchEvent(new CustomEvent('site-overlay-hide'));
  document.dispatchEvent(new CustomEvent('slideshow-photo-hide'));
});

// move this to component
document.addEventListener('keydown', function(evt) {
  switch(evt.keyCode) {
    case 37:
    case 38:
      document.dispatchEvent(new CustomEvent('slideshow-photos-show-previous'));
    break;
    case 39:
    case 40:
      document.dispatchEvent(new CustomEvent('slideshow-photos-show-next'));
    break;
    case 27:
      document.dispatchEvent(new CustomEvent('site-overlay-hide'));
    break;
  }
});

// event delegator?