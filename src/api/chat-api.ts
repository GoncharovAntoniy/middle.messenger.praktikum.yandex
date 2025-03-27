/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTTPTransport } from '.';
import store from '../store/store';
import { BaseApi } from './base-api';
import { BASE_URL } from './baseURL';

interface TValueUserToChat {
  users: [number];
  chatId: number;
}

const chatAPIInstance = new HTTPTransport();

export class ChatApi extends BaseApi {
  createChat(title: string) {
    return chatAPIInstance.post('/chats', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: { title },
    });
  }
  deleteChat(id: number) {
    return fetch(`${BASE_URL}/chats`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        chatId: id,
      }),
    });
  }
  getChats() {
    return chatAPIInstance.get('/chats');
  }
  getMessagesChat(id: number) {
    return fetch(`${BASE_URL}/chats/token/${id}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    });
  }
  getUserChat(id: number) {
    return fetch(`${BASE_URL}/chats/${id}/users`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });
  }

  async deleteUsersChat(usersIds: number[], chatId: number) {
    return fetch(`${BASE_URL}/chats/users`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        users: usersIds,
        chatId: chatId,
      }),
    });
  }

  async updateIconChat(chatId: string, data: Blob) {
    const formData = new FormData();
    formData.append('chatId', chatId);
    formData.append('avatar', data);
    await fetch(`${BASE_URL}/chats/avatar`, {
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
        console.log(data);
      })
      .catch((err) => console.error(err));
  }

  async userSearch(login: string) {
    const data = await fetch(`${BASE_URL}/user/search`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({ login }),
    });
    const res = await data.json();
    store.set('modalInfo.listUsersSearch', res);
    return res;
  }
  async addUserToChat(value: TValueUserToChat) {
    return await fetch(`${BASE_URL}/chats/users`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(value),
    });
  }
  async fetchUnreadMessages(chatId: number, ws: WebSocket) {
    const unreadCountResponse = await fetch(`${BASE_URL}/chats/${chatId}/new`);
    const unreadCount = await unreadCountResponse.json();

    let receivedMessages: any[] = [];
    let offset = 0;

    return new Promise((resolve) => {
      ws.onmessage = (event) => {
        const messages = JSON.parse(event.data);
        receivedMessages = [...receivedMessages, ...messages];

        if (receivedMessages.length < unreadCount) {
          offset = messages[messages.length - 1]?.id;
          ws.send(JSON.stringify({ content: String(offset), type: 'get old' }));
        } else {
          resolve(receivedMessages);
        }
      };

      ws.send(JSON.stringify({ content: '0', type: 'get old' }));
    });
  }
}
