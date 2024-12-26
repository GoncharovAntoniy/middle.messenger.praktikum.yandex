import Block from "../../../framework/Block";
import { TInfoAvatar } from "../../../types";

export class Avatar extends Block {
  constructor(props: TInfoAvatar) {
    super(props)
  }

  render() {
    return `<div class="avatar">
              <div class="avatar__leftBlock">
                <img src="/images/iconUser.svg" alt="icon" />
                <div class="avatar__leftBlock_infoUser">
                  <h5 class="avatar__leftBlock_infoUser_userName">{{ username }}</h5>
                  {{#if lastMessage}}
                    <p class="avatar__leftBlock_infoUser_lastMessage"> {{ lastMessage }}</p>
                  {{/if}}
                </div>
              </div>
              <div class="avatar__rightBlock">
                {{#if time}}
                  <p class="avatar__rightBlock_time">{{ time }}</p>
                {{/if}}
                {{#if notReadMessageCount }}
                  <span
                    class="avatar__rightBlock_countMessage"
                  >{{ notReadMessageCount }}</span>
                {{/if}}
              </div>
            </div>
          ` 
  }
}

