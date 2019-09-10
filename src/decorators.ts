import { customElementsDefine } from './customElements';

export function component(name: string, template: HTMLTemplateElement | null = null) {
  return (constructor: Function) => {
    customElementsDefine(name, constructor, template);
  }
}