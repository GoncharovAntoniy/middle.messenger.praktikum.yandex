import Block from '../../../framework/Block';
import { IUser } from '../../../types';

interface TProps extends IUser {
  onClick: (e: number) => void;
  typeButton: string;
  classButton: string;
}

export class UserChatElement extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          props.onClick && props.onClick(props.id);
        },
      },
    });
  }

  render() {
    return `<button
              id="{{id}}"
              type="{{typeButton}}"
              class="{{classButton}}"
            >
              {{login}}
            </button>`;
  }
}
