
export default (store) => (selector, callback) => {
  let oldState = {};
  return store.subscribe(() => {
    let selectedState = selector(store.getState());
    Object.entries(selectedState).map(([key, value]) => {
      if (oldState[key] !== value) {
        callback(key, value, oldState[value]);
        oldState[key] = value;
      }
    })
  })
}