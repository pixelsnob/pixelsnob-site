
export const customElementsDefine = (name, customElement, template) => {
  if (window.customElements && !window.customElements.get(name)) {
    if (template && window.ShadyCSS) {
      //console.log('prep')
      window.ShadyCSS.prepareTemplate(template, name);
    }
    customElements.define(name, customElement);
  }
}
