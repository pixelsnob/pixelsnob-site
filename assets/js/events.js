
document.addEventListener('photos-list-click', function(evt) {
  const template = document.getElementById('slideshow-template').content.cloneNode(true);
  document.dispatchEvent(new CustomEvent('site-overlay-show', {
    detail: { template }
  }));
  document.dispatchEvent(new CustomEvent('slideshow-photos-show', {
    detail: { id: evt.detail.id }
  }));
});

// document.addEventListener('site-overlay-hide', evt => {
//   //document.dispatchEvent(new CustomEvent('slideshow-photo-hide')); ////////////
// });

document.addEventListener('slideshow-photos-hide', evt => {
  document.dispatchEvent(new CustomEvent('site-overlay-hide'));
  document.dispatchEvent(new CustomEvent('slideshow-photo-hide'));
});

// Click on a photo to show next
// document.addEventListener('slideshow-photo-click', evt => {
//   document.dispatchEvent(new CustomEvent('slideshow-photos-show-next'));
// });

document.addEventListener('keydown', function(evt) {
  switch(evt.keyCode) {
    case 37:
      document.dispatchEvent(new CustomEvent('slideshow-photos-show-previous'));
    break;
    case 39:
      document.dispatchEvent(new CustomEvent('slideshow-photos-show-next'));
    break;
    case 27:
      document.dispatchEvent(new CustomEvent('site-overlay-hide'));
    break;
  }
});