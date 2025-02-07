import { Button } from '../../components/button';
import Block from '../../framework/Block';
import store, { StoreEvents } from '../../store/store';
import { TChatLogMessages, TContextChat, TModalInfo } from '../../types';
import { EmptyChatlog } from './components/emptyChatLog';
import { modalChat } from './components/modalChat';
import { MessageModule } from './modules/messageModule';
import { searchAndListUsersModule } from './modules/searchAndListUsersModule';

interface TCurrentProps {
  textButton: string;
  idButton: string;
  title: string;
}

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
        openModalChat: (e: Event, currentProps: TCurrentProps) => this.openModalChat(e, currentProps),
      }),
      ModalChat: new modalChat({ ...props.props.contextChat.modalInfo }),
    });
    store.on(StoreEvents.Updated, () => {
      // console.log('event on');
    });
  }

  openModalChat(e: Event, currentProps: TCurrentProps) {
    e.stopPropagation();

    let propsModal = this.props.props?.contextChat.modalInfo;
    propsModal = {
      ...propsModal,
      infoButton: {
        ...propsModal.infoButton,
        textButton: currentProps.textButton,
        idButton: currentProps.idButton,
      },
      title: currentProps.title,
      className: 'modalChat active',
    };
    const button = new Button({ ...propsModal.infoButton });
    this.children.ModalChat.setChild({ Button: button });
    this.children.ModalChat.setProps({
      title: currentProps.title,
      className: 'modalChat active',
      infoButton: {
        idButton: currentProps.idButton,
        textButton: currentProps.textButton,
      },
    });
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
