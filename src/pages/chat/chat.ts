import Block from '../../framework/Block';
import store, { StoreEvents } from '../../store/store';
import { TChatLogMessages, TContextChat, TModalInfo, TModalInfoDeleteUsers } from '../../types';
import { deleteUsersModalChat } from './components/deleteUsersModalChat';
import { modalChat } from './components/modalChat';
import { modalUpdateIconChat } from './components/modalUpdateIconChat';
import { MessageModule } from './modules/messageModule';
import { searchAndListUsersModule } from './modules/searchAndListUsersModule';

interface ContextChat extends TContextChat {
  modalInfo: TModalInfo;
  deleteUsersModalInfo: TModalInfoDeleteUsers;
}

interface TProps {
  emptyLog: boolean;
  contextChat: ContextChat;
  props: {
    chatLogMessages: TChatLogMessages[];
    contextChat: TContextChat;
    emptyLog: boolean;
  };
}

export class Chat extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      SearchAndListUsersModule: new searchAndListUsersModule(props.props.contextChat.infoAvatar),
      MessageModule: new MessageModule({
        ...props,
        openModalChatAddUser: (e: Event) => this.openModalChatAddUser(e),
        openModalChatDeleteUser: (e: Event) => this.openModalChatDeleteUser(e),
        openModalChatUpdateIcon: (e: Event) => this.openModalChatUpdateIcon(e),
      }),
      ModalChat: new modalChat({ ...props.props.contextChat.modalInfo }),
      DeleteModalChat: new deleteUsersModalChat({ ...props.props.contextChat.deleteUsersModalInfo }),
      ModalUpdateIconChat: new modalUpdateIconChat({ className: 'modalUpdateIconChat' }),
    });
    store.on(StoreEvents.Updated, () => {
      // console.log('event on');
    });
  }

  openModalChatAddUser(e: Event) {
    e.stopPropagation();

    store.set('modalInfo.className', 'modalChat active');
    store.set('modalInfo.title', 'Добавить пользователя');
  }
  openModalChatDeleteUser(e: Event) {
    e.stopPropagation();

    store.set('deleteUsersModalInfo.className', 'modalChat active');
    store.set('deleteUsersModalInfo.title', 'Удалить пользователя');
    store.set('deleteUsersModalInfo.chatId', Number(store.getState().currentChatId));
  }
  openModalChatUpdateIcon(e: Event) {
    e.stopPropagation();

    store.set('className', 'modalUpdateIconChat active');
  }
  render() {
    return `
          <div id="app">
              <main class="chatContainer">
                  <section class="chatContainer__leftSection">
                      {{{ SearchAndListUsersModule }}}
                  </section>
                  <section class="chatContainer__rightSection">
                  {{{ MessageModule }}}
                  
                  </section>
              </main>
              {{{ ModalChat }}}
              {{{ DeleteModalChat }}}
               {{{ ModalUpdateIconChat }}}
          <dic/>`;
  }
}
