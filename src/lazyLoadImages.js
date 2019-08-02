
export default selector => {

  const $images = [ ...document.querySelectorAll('.lazy-load') ];
  if (!$images.length) {
    return null;
  }

  if (typeof window != 'undefined' && 'IntersectionObserver' in window) {
    let observer = new IntersectionObserver(function(entries) {
      entries.forEach(async function(entry) {
        if (entry.isIntersecting) {
          const src = entry.target.dataset.src;
          if (src) {
            preloadImages( [ src ]).then(function() {
              entry.target.classList.remove('lazy-load');
              entry.target.classList.add('lazy-loaded');
            });
            entry.target.src = src;
            observer.unobserve(entry.target);
          }
        }
      })
    })

    $images.forEach(function($images) {
      observer.observe($images)
    })

  } else {
    // If IntersectionObserver is not supported, load all images
    $images.forEach(el => {
      
      setTimeout(() => {
        el.classList.add(selector)
        el.classList.remove('lazy')
      }, 100)
      
    })
  }
};
