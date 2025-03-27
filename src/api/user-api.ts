/* eslint-disable @typescript-eslint/no-explicit-any */
import store from '../store/store';
import { BaseApi } from './base-api';
import { BASE_URL } from './baseURL';

export class UserApi extends BaseApi {
  async updateUserInfo(data: Record<string, any>) {
    return fetch(`${BASE_URL}/user/profile`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.reason) {
          return;
        } else {
          localStorage.setItem('userInfo', JSON.stringify(data));
          store.set('contextProfile.userInfo', data);
          console.log('call store from user api', store.getState().contextProfile.userInfo);
        }
      })
      .catch(console.error);
  }
  async updateUserPassword(data: Record<string, any>) {
    return fetch(`${BASE_URL}/user/password`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('call store from user api password', data);
      })
      .catch((err) => console.error(err));
  }
  async updateUserAvatar(data: Blob) {
    const formData = new FormData();
    formData.append('avatar', data);
    return fetch(`${BASE_URL}/user/profile/avatar`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        accept: 'application/json',
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('call store from user api icon', data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        store.set('contextProfile.avatarInfo.classAvatar', `${store.getState().contextProfile.avatarInfo.classAvatar} iconAvatar`);
      })
      .catch((err) => console.error(err));
  }
}
