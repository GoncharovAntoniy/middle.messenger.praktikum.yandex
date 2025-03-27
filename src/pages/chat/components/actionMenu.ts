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
  openModalChatAddUser: (e: Event, currentProps: TCurrentProps) => void;
  openModalChatDeleteUser: (e: Event, currentProps: TCurrentProps) => void;
  openModalChatUpdateIcon: (e: Event, currentProps: TCurrentProps) => void;
};

type TProps = {
  openModalChatAddUser: (e: Event, currentProps: TCurrentProps) => void;
  openModalChatDeleteUser: (e: Event, currentProps: TCurrentProps) => void;
  openModalChatUpdateIcon: (e: Event, currentProps: TCurrentProps) => void;
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
        onClick: (e: Event, currentProps: TCurrentProps) => props.openModalChatAddUser(e, currentProps),
      }),
      ActionMenuItemDeleteChat: new ActionMenuItem({
        idAction: 'deleteUser',
        item_text: 'Удалить чат',
        title: 'Удалить чат',
        textButton: 'Удалить',
        idButton: 'deleteUser',
        onClick: () => {
          const id = store.getState().currentChatId as number;
          chatController.deleteChat(id);
          this.setProps({ className: 'actionMenu' });
        },
      }),
      ActionMenuItemDeleteUser: new ActionMenuItem({
        idAction: 'deleteUser',
        item_text: 'Удалить пользователя',
        title: 'Удалить пользователя',
        textButton: 'Удалить',
        idButton: 'deleteUser',
        onClick: (e: Event, currentProps: TCurrentProps) => props.openModalChatDeleteUser(e, currentProps),
      }),
      ActionMenuItemUpdateIcon: new ActionMenuItem({
        idAction: 'deleteUser',
        item_text: 'Изменить аватар',
        title: 'Изменить аватар',
        textButton: 'Сохранить',
        idButton: 'deleteUser',
        onClick: (e: Event, currentProps: TCurrentProps) => props.openModalChatUpdateIcon(e, currentProps),
      }),
    });
  }

  render() {
    return `<div class="{{className}}">
                    {{{ ActionMenuItemAddUser }}}
                    {{{ ActionMenuItemDeleteChat }}}
                    {{{ ActionMenuItemDeleteUser }}}
                    {{{ ActionMenuItemUpdateIcon }}}
                </div>`;
  }
}
