import { customElementsDefine } from './customElements';

export function component(name: string, template: HTMLTemplateElement | null = null) {
  return (constructor: Function) => {
      
      // const extended = class extends constructor {

      //   public shadowRoot: ShadowRoot;

      //   constructor(...args: any[]) {
      //     super(...args);
      //     this.shadowRoot = this.attachShadow({ mode: 'open' });
      //     //console.log('??sfdkjasjdh')
      //   }
      // }

    customElementsDefine(name, constructor, template);

  }
}