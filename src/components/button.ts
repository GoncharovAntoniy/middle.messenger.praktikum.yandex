import Block from '../framework/Block';
import { TButton } from '../types';

interface TProps extends TButton {
  onClick?: (e: Event, currentThis?: Button) => void;
  onSubmit?: (e: Event, currentThis: Button) => void;
}

export class Button extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          console.log(props);
          props.onClick && props.onClick(e, this as Button);
        },
        submit: (e: Event) => {
          e.preventDefault();
          props.onSubmit && props.onSubmit(e, this as Button);
        },
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
