
export function component(name: string, template: HTMLTemplateElement | null = null) {
  return (constructor: PossiblyAbstractConstructor<HTMLElement>) => {
    if (window.customElements && !window.customElements.get(name)) {
      if (template && window.ShadyCSS) {
        window.ShadyCSS.prepareTemplate(template, name);
      }
      customElements.define(name, constructor);
    }
  }
}

