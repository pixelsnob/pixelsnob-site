
export const customElementsDefine = (name, customElement) => {
  if (!customElements.get(name)) {
    customElements.define(name, customElement);
  }
}

export const customElementsDefineFromArray = (customElementsArray) => {
  customElementsArray.forEach(([ key, val ]) => {
    customElementsDefine(key, val);
  });
}