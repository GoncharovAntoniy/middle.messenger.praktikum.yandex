import Block from '../framework/Block';
import { TButton } from '../types';

interface TProps extends TButton {
  onClick: (e: Event, currentThis: any) => void;
}

export class Button extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick(e, this),
      },
    });
  }

  render() {
    return `<button
              id="{{idButton}}"
              type="{{typeButton}}"
              class="{{classButton}}"
            >
              {{textButton}}
            </button>`;
  }
}
