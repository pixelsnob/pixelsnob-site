document.addEventListener('touchstart', handleTouchStart, { passive: true });    
document.addEventListener('touchmove', handleTouchMove, { passive: true });

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches ||       // browser API
     evt.originalEvent.touches; // jQuery
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

  if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
    if ( xDiff > 0 ) {
      /* left swipe */ 
      //console.log('left')
      document.dispatchEvent(new CustomEvent('touch-swiped-left'));
    } else {
      /* right swipe */
      //console.log('right')
      document.dispatchEvent(new CustomEvent('touch-swiped-right'));

    }             
  } else {
    if ( yDiff > 0 ) {
      /* up swipe */ 
    } else { 
      /* down swipe */
    }                                 
  }
  /* reset values */
  xDown = null;
  yDown = null;                       
};
