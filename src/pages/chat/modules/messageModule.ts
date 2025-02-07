import Block from '../../../framework/Block';
import { TChatLogMessages, TContextChat } from '../../../types';
import { chatLog } from '../components/chatLog';
import { EmptyChatlog } from '../components/emptyChatLog';
import { headerChat } from '../components/headerChat';
import { SubmitInput } from '../components/submitInput';

export interface TCurrentProps {
  textButton: string;
  idButton: string;
  title: string;
}

interface TProps {
  props: {
    chatLogMessages: TChatLogMessages[];
    contextChat: TContextChat;
    emptyLog: boolean;
  };
  contextChat: TContextChat;
  openModalChat: (e: Event, currentProps: TCurrentProps) => void;
  emptyLog: boolean;
}

export class MessageModule extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      EmptyChatLog: new EmptyChatlog({ emptyLog: props.emptyLog }),
      HeaderChat: new headerChat({ openModalChat: props.openModalChat }),
      ChatLog: new chatLog({ ...props }),
      SubmitInput: new SubmitInput({
        ...props,
      }),
    });
  }
  render() {
    return `
        <div class="messageModule">
            <div class="messageModule__header">
              {{{ HeaderChat }}}    
            </div>
            {{#if epmtyLog}}
                {{{ EmptyChatLog }}}
            {{/if}}
            {{#unless emptyLog}}
                
                <div class="messageModule__chat">
                {{{ ChatLog }}}
                    
                </div>
                <div class="messageModule__formSubmit">


                {{{ SubmitInput }}}
                    
                </div>
            {{/unless}}
        </div>`;
  }
}
