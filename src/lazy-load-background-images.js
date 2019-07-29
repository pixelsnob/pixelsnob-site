

(function() {
  const lazyBackgrounds = [ ...document.querySelectorAll('.lazy-load') ];

  if (lazyBackgrounds.length === 0) {
    return;
  }

  if (typeof window != 'undefined' && 'IntersectionObserver' in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function(entries) {
      entries.forEach(async function(entry) {
        if (entry.isIntersecting) {
          const src = entry.target.dataset.src;
          if (src) {
            preloadImages( [ src ]).then(function() {
              entry.target.classList.remove('lazy-load');
              entry.target.classList.add('lazy-loaded');
            });
            entry.target.src = src;
            lazyBackgroundObserver.unobserve(entry.target);
          }
        }
      })
    })

    lazyBackgrounds.forEach(function(lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground)
    })

  } else {
    // If IntersectionObserver is not supported, load all images
    lazyBackgrounds.forEach(el => {
      
      setTimeout(() => {
        el.classList.add('lazy-loaded')
        el.classList.remove('lazy')
      }, 100)
      
    })
  }
})();