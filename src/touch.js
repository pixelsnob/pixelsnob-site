
export default (el, cb) => {

  el.addEventListener('touchstart', handleTouchStart, { passive: true });    
  el.addEventListener('touchmove', handleTouchMove, { passive: true });
  
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
    if (!xDown || !yDown) {
      return;
    }
  
    var xUp = evt.touches[0].clientX;                  
    var yUp = evt.touches[0].clientY;
  
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    
    if (Math.abs(xDiff) > Math.abs(yDiff)) { /*most significant*/
      if (xDiff > 0) {
        cb('left');
      } else {
        cb('right');  
      }             
    } else {
      if (yDiff > 0) {
        cb('up');  
      } else { 
        cb('down');  
      }                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                       
  };
  
  return () => {
    el.removeEventListener('touchstart', handleTouchStart, { passive: true });    
    el.removeEventListener('touchmove', handleTouchMove, { passive: true });
  }
};
