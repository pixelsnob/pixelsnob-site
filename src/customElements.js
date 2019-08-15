
export const customElementsDefine = (name, customElement) => {
  if (!customElements.get(name)) {
    //console.log(name, customElement)
    customElements.define(name, customElement);
  }
}


export const customElementsDefineFromArray = (customElementsArray) => {
  customElementsArray.forEach(([ key, val ]) => {
    //console.log(key, val);
    customElementsDefine(key, val);
  });
}