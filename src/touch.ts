
export default (el: HTMLElement, cb: (touchEventName: string) => void) => {

  
  let xDown: number | null = null;
  let yDown: number | null = null;
  
  function getTouches(ev: TouchEvent) {
    return ev.touches;
  }
  
  function handleTouchStart(ev: TouchEvent) {
    const firstTouch = getTouches(ev)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };
  
  function handleTouchMove(ev: TouchEvent) {
    if (!xDown || !yDown) {
      return;
    }
  
    const xUp = ev.touches[0].clientX;                  
    const yUp = ev.touches[0].clientY;
  
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;
    
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
  

  el.addEventListener('touchstart', handleTouchStart);    
  el.addEventListener('touchmove', handleTouchMove);
  
  return () => {
    el.removeEventListener('touchstart', handleTouchStart);    
    el.removeEventListener('touchmove', handleTouchMove);
  }
};
