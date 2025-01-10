import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import Block from '../../../framework/Block';
import { TButton, TInput, TModalInfo } from '../../../types';

export interface TPropsModalChat extends TModalInfo {
  infoInput: TInput;
  infoButton: TButton;
}

export class ModalChat extends Block {
  constructor(props: TPropsModalChat) {
    super({
      ...props,
      Input: new Input({
        ...props.infoInput,
        onChange: (e: Event, currentThis: Input) => {
          const { value } = e.target as HTMLInputElement;
          console.log(value, currentThis);
        },
        onBlur: (e: Event, currentThis: Input) => console.log(e, currentThis),
      }),
      Button: new Button({
        ...props.infoButton,
        onClick: (e: Event) => {
          console.log(e);
        },
      }),
      events: {
        submit: (e: Event) => e.preventDefault(),
        click: (e: Event) => {
          const attrClass = (e.target as HTMLInputElement).getAttribute('class');
          if (attrClass === 'modalChat__container') {
            e.stopPropagation();
          }
          if (attrClass === 'modalChat active') {
            this.setProps({ className: 'modalChat' });
          }
        },
      },
    });
  }

  render() {
    return `<form class="{{className}}">
                    <div class="modalChat__container">
                        <h4 class="modalChat__container">{{title}}</h4>
                        {{{ Input }}}
                        {{{ Button }}}
                        
                    </div>
                </form>
                `;
  }
}
