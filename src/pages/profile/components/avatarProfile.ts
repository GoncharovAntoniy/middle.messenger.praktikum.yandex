import { BASE_URL } from '../../../api/baseURL';
import Block from '../../../framework/Block';
import { connect } from '../../../store/store';
import { TAvatarInfoProfile } from '../../../types';

export class AvatarProfile extends Block {
  constructor(props: TAvatarInfoProfile) {
    super({
      ...props,
      events: {
        click: () => props.onClick(),
      },
    });
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
            </div>`;
  }
}

const mapStateToProps = (state: any) => {
  const avatar = JSON.parse(String(localStorage.getItem('userInfo'))).avatar
    ? `${BASE_URL}/resources${JSON.parse(String(localStorage.getItem('userInfo'))).avatar}`
    : state.contextProfile.avatarInfo.avatar;
  return {
    avatar: avatar,
    classAvatar: `${state.contextProfile.avatarInfo.classAvatar} iconAvatar`,
    username: state.contextProfile.avatarInfo.username,
  };
};

export const avatarProfile = connect(mapStateToProps)(AvatarProfile as any);
