/* eslint-disable @typescript-eslint/no-explicit-any */
import Block from '../../../framework/Block';
import store, { connect, StoreEvents } from '../../../store/store';
import { TInfoAvatar } from '../../../types';
import { formatDate } from '../../../utils/formatDate';
import chatController from '../chat-controller';

export class Avatar extends Block {
  constructor(props: TInfoAvatar) {
    super({
      ...props,
      avatar: props.avatar,
      created_by: props.created_by,
      id: props.id,
      last_message: props.last_message,
      title: props.title,
      unread_count: props.unread_count,
      time: props.last_message?.time ? formatDate(props.last_message?.time) : null,
      currentChatClass: props.currentChatClass || 'avatar',
      events: {
        click: async () => {
          await chatController.getMessagesUser(this.props.id as number, props.title);
        },
      },
    });
    store.on(StoreEvents.Updated, () => {
      // console.log('event on');
    });
  }

  sendMessage() {
    chatController.sendMessage('get old', '0');
  }

  render() {
    return `<div class="{{currentChatClass}}">
              <div class="avatar__leftBlock">
                <img src="/images/iconUser.svg" alt="icon" />
                <div class="avatar__leftBlock_infoUser">
                  <h5 class="avatar__leftBlock_infoUser_userName">{{ title }}</h5>
                  {{#if last_message}}
                    <p class="avatar__leftBlock_infoUser_lastMessage"> {{ last_message.content }}</p>
                  {{/if}}
                </div>
              </div>
              <div class="avatar__rightBlock">
                {{#if time}}
                  <p class="avatar__rightBlock_time">{{ time }}</p>
                {{/if}}
                {{#if unread_count }}
                  <span
                    class="avatar__rightBlock_countMessage"
                  >{{ unread_count }}</span>
                {{/if}}
              </div>
            </div>
          `;
  }
}

function mapChatToProps(state: any) {
  return {
    title: state.title || state.contextChat.infoHeaderChat.title,
  };
}
export const avatar = connect(mapChatToProps)(Avatar as any);
