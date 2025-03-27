import { Button } from '../../../components/button';
import Block from '../../../framework/Block';
import store, { connect, StoreEvents } from '../../../store/store';
import { inputModal } from '../../profile/components/inputModal';
import chatController from '../chat-controller';

interface IProps {
  className: string;
}

export class ModalUpdateIconChat extends Block {
  constructor(props: IProps) {
    super({
      className: props.className,
      InputModalProfile: new inputModal({
        inputId: 'addFoto',
        classInput: 'addFotoInput',
        typeInput: 'file',
        value: '',
        placeholderInput: 'Выбрать файл на компьютере',
        onChange: (event: Event) => this.onChange(event),
      }),
      Button: new Button({ idButton: 'buttonUpdateFoto', typeButton: 'button', classButton: 'buttonAuth', textButton: 'Поменять', onClick: () => this.updateIconAvatar() }),
      events: {
        click: (e: Event) => {
          const attrClass = (e.target as HTMLInputElement).getAttribute('class');
          if (attrClass === 'modalUpdateIconChat__container') {
            e.stopPropagation();
          }
          if (attrClass === 'modalUpdateIconChat active') {
            store.set('className', 'modalUpdateIconChat');
          }
        },
      },
    });
    store.on(StoreEvents.Updated, () => null);
  }

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const iconUrl = URL.createObjectURL(file);
    this.children.InputModalProfile.setProps({ value: iconUrl });
    store.set('chatIcon', file);
  }

  async updateIconAvatar() {
    const icon = store.getState().chatIcon;
    const chatId = store.getState().currentChatId;
    await chatController.updateIconChat(Number(chatId), icon as Blob);
    store.set('className', 'modalUpdateIconChat');
    chatController.getListUsers();
  }

  render() {
    return `<div class="{{{ className }}}">
                    <div class="modalUpdateIconChat__container">
                        <h4 class="modalProfile__container_title">Изменить аватар</h4>
                        {{{InputModalProfile}}}
                        {{{ Button }}}
                    </div>
                </div>
                `;
  }
}

function mapChatToProps(state: any) {
  return {
    className: state.className || 'modalUpdateIconChat',
  };
}
export const modalUpdateIconChat = connect(mapChatToProps)(ModalUpdateIconChat as any);
