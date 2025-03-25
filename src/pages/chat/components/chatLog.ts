import Block from '../../../framework/Block';
import { connect } from '../../../store/store';
import { TChatLogMessages, TContextChat } from '../../../types';
import { isEqualAuthor } from '../../../utils/isEqualUtil';
// import chatController from '../chat-controller';
import { Message } from './message';

type TProps = {
  props: {
    chatLogMessages: TChatLogMessages[];
    contextChat: TContextChat;
    emptyLog: boolean;
  };
};

export class ChatLog extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      Messages: props.props.chatLogMessages.map((item: TChatLogMessages) => new Message({ ...item })),
    });
    // chatController.sendMessage('get old', '0');
  }
  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.props || newProps.props) {
      if (!isEqualAuthor(oldProps.props?.chatLogMessages, newProps.props?.chatLogMessages)) {
        this.setLists({
          Messages: newProps.props.chatLogMessages.map((item: TChatLogMessages) => new Message(item)),
        });
        this.setProps({ ...newProps.props });
      }
    }
    return true;
  }
  render() {
    return `<div id="chatLogId" class="chatLog">
              {{{Messages}}}
            </div>
            `;
  }
}

const mapStateToProps = (state: any) => {
  return {
    props: {
      chatLogMessages: state.chatLogMessages,
    },
  };
};

export const chatLog = connect(mapStateToProps)(ChatLog as any);
