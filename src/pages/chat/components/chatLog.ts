import Block from "../../../framework/Block";
import { Message } from "./message";

export class ChatLog extends Block {
  constructor(props) {
    super({
      ...props,
      Messages: props.props.chatLogMessages.map((item) => new Message({
        isImage: item.isImage,
        role: item.role,
        message: item.message,
        time: item.time
      }))
    })
  }
  render() {
    return `<div class="chatLog">
              {{{Messages}}}
            </div>
            `
  }
}

