import Block from '../framework/Block';

export function render(query: string, block: Block) {
  const root: HTMLElement | null = document.querySelector(query);
  if (root && query !== null) {
    root.replaceWith(block.getContent());
  }
  return root;
}
