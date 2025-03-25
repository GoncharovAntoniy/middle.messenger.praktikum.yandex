import { BaseApi } from './base-api';
import { HTTPTransport } from '.';
import { router } from '../App';
// import chatController from '../pages/chat/chat-controller';
// import { store } from '../store/store';

const logoutApiInstance = new HTTPTransport();

export class LogoutApi extends BaseApi {
  async logout() {
    return await logoutApiInstance
      .post('/api/v2/auth/logout', {
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
  //   async authUser() {
  //     return await loginApiInstance.get('/api/v2/auth/user').then((authData) => {
  //       if (authData) {
  //         localStorage.setItem('userInfo', JSON.stringify(authData));
  //       } else {
  //         console.log('Authentication failed');
  //       }
  //     });
  //   }
}
