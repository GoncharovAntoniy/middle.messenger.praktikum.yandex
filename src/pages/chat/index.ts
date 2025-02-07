import { connect } from '../../store/store';
import { Chat } from './chat';

function mapChatToProps(state: any) {
  return {
    props: {
      contextChat: { ...state.contextChat },
      emptyLog: { ...state.emptyLog },
      chatLogMessages: [...state.chatLogMessages],
      currentChatId: state.currentChatId,
    },
  };
}

const ConnectedChat = connect(mapChatToProps)(Chat as any);
export default ConnectedChat;
