import { BaseApi } from './base-api';
import { HTTPTransport } from '.';
import { router } from '../App';

const logoutApiInstance = new HTTPTransport();

export class LogoutApi extends BaseApi {
  async logout() {
    return await logoutApiInstance
      .post('/auth/logout', {
        headers: {
          accept: 'application/json',
        },
        data: '',
      })
      .then((res) => {
        console.log(res);
        if (res === 'OK') {
          localStorage.removeItem('userInfo');
          // chatController.closeWS();
          router.go('/');
        }
      });
  }
}
