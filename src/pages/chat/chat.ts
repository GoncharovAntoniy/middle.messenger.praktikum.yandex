import Block from '../../framework/Block';
import store, { StoreEvents } from '../../store/store';
import { TChatLogMessages, TContextChat, TModalInfo } from '../../types';
// import { EmptyChatlog } from './components/emptyChatLog';
import { modalChat } from './components/modalChat';
import { MessageModule } from './modules/messageModule';
import { searchAndListUsersModule } from './modules/searchAndListUsersModule';

interface ContextChat extends TContextChat {
  modalInfo: TModalInfo;
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
        openModalChat: (e: Event) => this.openModalChat(e),
      }),
      ModalChat: new modalChat({ ...props.props.contextChat.modalInfo }),
    });
    store.on(StoreEvents.Updated, () => {
      // console.log('event on');
    });
  }

  openModalChat(e: Event) {
    e.stopPropagation();

    store.set('modalInfo.className', 'modalChat active');
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
          <dic/>`;
  }
}
