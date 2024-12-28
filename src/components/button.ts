import Block from '../framework/Block';
import { TButton } from '../types';

interface TProps extends TButton {
  onClick: (e: Event, currentThis: Button) => void;
}

export class Button extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick(e, this as Button),
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
