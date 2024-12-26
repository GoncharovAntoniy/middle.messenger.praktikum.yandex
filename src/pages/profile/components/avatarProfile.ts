import Block from "../../../framework/Block";
import { TAvatarInfoProfile } from "../../../types";

export class AvatarProfile extends Block {
  constructor(props: TAvatarInfoProfile) {
    super(props)
  }
  render() {
    return `<div class="profile__infoUser_avatar">
              <div class="profile__infoUser_avatar-container">
                <img
                  class="{{{classAvatar}}}"
                  src="{{{avatar}}}"
                  alt="icon"
                />
              </div>
              <p class="profile__infoUser_avatar-userName">{{{username}}}</p>
            </div>`
  }
}


