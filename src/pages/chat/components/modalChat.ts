import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import Block from '../../../framework/Block';
import store, { connect, StoreEvents } from '../../../store/store';
import { TButton, TInput, TModalInfo } from '../../../types';
import chatController from '../chat-controller';

export interface TPropsModalChat extends TModalInfo {
  infoInput: TInput;
  infoButton: TButton;
}

export class ModalChat extends Block {
  currentValueLogin = '';
  constructor(props: TPropsModalChat) {
    super({
      ...props,
      Input: new Input({
        ...props.infoInput,
        onChange: (e: Event, currentThis: Input) => {
          const { value } = e.target as HTMLInputElement;
          this.currentValueLogin = value;
          console.log(value, currentThis);
        },
        onBlur: (e: Event, currentThis: Input) => console.log(e, currentThis),
      }),
      Button: new Button({
        ...props.infoButton,
        onClick: (e: Event) => {
          console.log(e);
          chatController.setListUsers(this.currentValueLogin);
        },
      }),
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          chatController.addUserChat({ users: [0], chatId: store.getState().currentChatId as number });
        },
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
    store.on(StoreEvents.Updated, () => {
      // console.log('store on');
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (state: Record<string, any>) => {
  return {
    title: state.contextChat.modalInfo.title,
    className: state.contextChat.modalInfo.className,
    infoInput: state.contextChat.modalInfo.infoInput,
    infoButton: state.contextChat.modalInfo.infoButton,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const modalChat = connect(mapStateToProps)(ModalChat as any);
