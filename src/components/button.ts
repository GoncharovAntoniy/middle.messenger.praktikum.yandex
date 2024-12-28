import Block from '../framework/Block';
import { TButton } from '../types';

interface TProps extends TButton {
  onClick?: (e: Event, currentThis: Button) => void;
  onSubmit?: (e: Event) => void;
}

export class Button extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick && props.onClick(e, this as Button),
        submit: (e: Event) => props.onSubmit && props.onSubmit(e),
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
