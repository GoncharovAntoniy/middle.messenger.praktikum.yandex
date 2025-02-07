import Block from '../../../framework/Block';
import store from '../../../store/store';
import chatController from '../chat-controller';
import { TCurrentProps } from '../modules/messageModule';
import { ActionMenuItem } from './actionMenuItem';

export type TActionMenuItem = {
  idAction: string;
  item_text: string;
  title: string;
  textButton: string;
  idButton: string;
  className: string;
  onClick: (e: Event, currentProps: TCurrentProps) => void;
  openModalChat: (e: Event, currentProps: TCurrentProps) => void;
};

type TProps = {
  openModalChat: (e: Event, currentProps: TCurrentProps) => void;
  className: string;
};

export class ActionMenu extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      className: props.className,
      ActionMenuItemAddUser: new ActionMenuItem({
        idAction: 'addedUser',
        item_text: 'Добавить пользователя',
        title: 'Добавить пользователя',
        textButton: 'Добавить',
        idButton: 'addUser',
        onClick: (e: Event, currentProps: TCurrentProps) => props.openModalChat(e, currentProps),
      }),
      ActionMenuItemDeleteUser: new ActionMenuItem({
        idAction: 'deleteUser',
        item_text: 'Удалить чат',
        title: 'Удалить чат',
        textButton: 'Удалить',
        idButton: 'deleteUser',
        onClick: () => {
          const id = store.getState().currentChatId as number;
          chatController.deleteUserChat(id);
          this.setProps({ className: 'actionMenu' });
        },
      }),
    });
  }

  render() {
    return `<div class="{{className}}">
                    {{{ ActionMenuItemAddUser }}}
                    {{{ ActionMenuItemDeleteUser }}}
                </div>`;
  }
}
