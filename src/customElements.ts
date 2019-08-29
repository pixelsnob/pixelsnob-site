
export const customElementsDefine = (name: string, customElement: ObjectConstructor, template: HTMLTemplateElement | null = null) => {
  if (window.customElements && !window.customElements.get(name)) {
    if (template && window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(template, name);
    }
    customElements.define(name, customElement);
  }
}
