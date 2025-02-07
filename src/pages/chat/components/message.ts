import Block from '../../../framework/Block';
import store from '../../../store/store';
import { TChatLogMessages } from '../../../types';
import { formatDate } from '../../../utils/formatDate';

export class Message extends Block {
  constructor(props: TChatLogMessages) {
    super({
      ...props,
      role: JSON.parse(localStorage.getItem('userInfo')).id === props.user_id,
      time: formatDate(props.time),
    });
  }

  render() {
    console.log('store', store.getState().currentChatId);
    return `<div>
                    {{#if role}}
                    <div class="chatLog__myMessage">
                        {{#if isImage}}
                        <div class="chatLog__myMessage_media">

                        <img src="{{content}}" alt="image">
                        </div>
                        {{else}}
                        {{#if content }}
                          <p class="chatLog__myMessage_message">
                          {{content}}
                          <span class="chatLog__myMessage_message-time"> <img src="/images/dubleCheckIcon.svg" alt="icon"> {{time}}</span>
                          </p>
                        {{/if}}
                        {{/if}}
                    </div>
                    {{/if}}
                    {{#unless role}}
                    <div class="chatLog__yourMessage">
                    
                        <p class="chatLog__yourMessage_message">
                        {{content}}
                        <span class="chatLog__yourMessage_message-time">{{time}}</span>
                        </p>
                    </div>
                    {{/unless}}
                <div/>`;
  }
}
