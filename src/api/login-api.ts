import { BaseApi } from './base-api';
import { HTTPTransport } from '.';
import { router } from '../App';
import chatController from '../pages/chat/chat-controller';
// import { store } from '../store/store';

const loginApiInstance = new HTTPTransport();

export class LoginApi extends BaseApi {
  async login(data: Record<string, any>) {
    return await loginApiInstance
      .post('/api/v2/auth/signin', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: data,
      })
      .then((data) => {
        if (data === 'OK') {
          this.authUser();
          router.go('/chat');
          chatController.getListUsers();
        } else {
          console.log('Упс');
        }
      });
  }
  async authUser() {
    return await loginApiInstance.get('/api/v2/auth/user').then((authData) => {
      if (authData) {
        localStorage.setItem('userInfo', JSON.stringify(authData));
      } else {
        console.log('Authentication failed');
      }
    });
  }
}
// {
//   "id": 3175,
//   "first_name": "Antoniy",
//   "second_name": "G",
//   "display_name": null,
//   "login": "antoniy",
//   "avatar": null,
//   "email": "testGoncharov@mail.ru",
//   "phone": "89991119922"
// }
