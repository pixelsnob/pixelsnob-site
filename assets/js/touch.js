
// Basic touch events, based on https://stackoverflow.com/a/23230280

(function() {

  document.addEventListener('touchstart', handleTouchStart, { passive: true });    
  document.addEventListener('touchmove', handleTouchMove, { passive: true });

  var xDown = null;
  var yDown = null;

  function getTouches(evt) {
    return evt.touches;
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
      return;
    }

    var xUp = evt.touches[0].clientX;                  
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    
    document.dispatchEvent(new CustomEvent('touch-swiped'));

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
      if ( xDiff > 0 ) {
        document.dispatchEvent(new CustomEvent('touch-swiped-left'));
      } else {
        document.dispatchEvent(new CustomEvent('touch-swiped-right'));

      }             
    } else {
      if ( yDiff > 0 ) {
        document.dispatchEvent(new CustomEvent('touch-swiped-up'));
      } else { 
        document.dispatchEvent(new CustomEvent('touch-swiped-down'));
      }                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                       
  };

})();