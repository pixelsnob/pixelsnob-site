
export const customElementsDefine = (name: string, customElement: any, template: HTMLTemplateElement | null = null) => {
  //console.log('?', name)
  if (window.customElements && !window.customElements.get(name)) {
    
    if (template && window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(template, name);
    }
    customElements.define(name, customElement);
  }
}
