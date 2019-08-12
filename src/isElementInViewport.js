
export default function(el) {///////////////rename
  const bounding = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const vw = window.innerWidth || document.documentElement.clientWidth;

  return (
      //bounding.top >= -(bounding.height) &&
      bounding.left >= 0 &&
      bounding.bottom <= (vh + bounding.height) &&
      bounding.right <= (vw)
  );
};
