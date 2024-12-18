import Block from "../../../framework/Block";
import { ChatLog } from "../components/chatLog";
import { EmptyChatlog } from "../components/emptyChatLog";
import { HeaderChat } from "../components/headerChat";
import { SubmitInput } from "../components/submitInput";

export class MessageModule extends Block {
    constructor(props: any) {
        super({...props,
            EmptyChatLog: new EmptyChatlog({}),
            HeaderChat: new HeaderChat({...props}),
            ChatLog: new ChatLog({...props}),
            SubmitInput: new SubmitInput({})
        })
        this.props = props
    }
    epmtyLog = this.props.epmtyLog
    override render() {
        return`
        <div class="messageModule">
            {{#if epmtyLog}}
                {{{ EmptyChatLog }}}
            {{/if}}
            {{#unless emptyLog}}
                <div class="messageModule__header">
                {{{ HeaderChat }}}
                    
                </div>
                <div class="messageModule__chat">
                {{{ ChatLog }}}
                    
                </div>
                <div class="messageModule__formSubmit">


                {{{ SubmitInput }}}
                    
                </div>
            {{/unless}}
        </div>`
    }
}


