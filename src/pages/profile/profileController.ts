/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseURL } from '../../api/baseURL';
import { UserApi } from '../../api/user-api';
import store from '../../store/store';

const profileApi = new UserApi();

class ProfileController {
  public async updateAvatar(data: Blob) {
    await profileApi.updateUserAvatar(data).then((res) => {
      store.set('contextProfile.avatarInfo.avatar', `${baseURL}/resources${res}`);
      console.log(res);
    });
  }
}

export default new ProfileController();
