import Block from "../../../framework/Block";
import { TChatLogMessages, TContextChat } from "../../../types";
import { Message } from "./message";

type TProps = {
  props: {
    chatLogMessages: TChatLogMessages[],
    contextChat: TContextChat,
    emptyLog: boolean,
  }
}

export class ChatLog extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      Messages: props.props.chatLogMessages.map((item: TChatLogMessages) => new Message({...item}))
    })
  }
  render() {
    return `<div id="chatLogId" class="chatLog">
              {{{Messages}}}
            </div>
            `
  }
}
