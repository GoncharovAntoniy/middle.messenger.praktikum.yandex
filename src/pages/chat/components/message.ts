import Block from "../../../framework/Block";

export class Message extends Block {
    constructor(props: any) {
        super({
            ...props,
            isImage: props.isImage,
            role: props.role,
            message: props.message,
            time: props.time
        })
    }

    render() {
        return `<div>
                    {{#if role}}
                    <div class="chatLog__myMessage">
                        {{#if isImage}}
                        <div class="chatLog__myMessage_media">

                        <img src="{{message}}" alt="image">
                        </div>
                        {{else}}
                        <p class="chatLog__myMessage_message">
                        {{message}}
                        <span class="chatLog__myMessage_message-time"> <img src="/images/dubleCheckIcon.svg" alt="icon"> {{time}}</span>
                        </p>
                        {{/if}}
                    </div>
                    {{/if}}
                    {{#unless role}}
                    <div class="chatLog__yourMessage">
                    
                        <p class="chatLog__yourMessage_message">
                        {{message}}
                        <span class="chatLog__yourMessage_message-time">{{time}}</span>
                        </p>
                    </div>
                    {{/unless}}
                <div/>`
    }
}