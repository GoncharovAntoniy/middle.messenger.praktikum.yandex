/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTTPTransport } from '.';
import store from '../store/store';
import { BaseApi } from './base-api';

interface TValueUserToChat {
  users: [number];
  chatId: number;
}

const chatAPIInstance = new HTTPTransport();
const baseHost = 'https://ya-praktikum.tech';

export class ChatApi extends BaseApi {
  createChat(title: string) {
    return chatAPIInstance.post('/api/v2/chats', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: { title },
    });
  }
  deleteChat(id: number) {
    return fetch(`${baseHost}/api/v2/chats`, {
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
    return chatAPIInstance.get('/api/v2/chats');
  }
  getMessagesChat(id: number) {
    return fetch(`${baseHost}/api/v2/chats/token/${id}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    });
  }
  getUserChat(id: number) {
    return fetch(`${baseHost}/api/v2/chats/${id}/users`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });
  }

  async userSearch(login: string) {
    const data = await fetch(`${baseHost}/api/v2/user/search`, {
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
    return await fetch(`${baseHost}/api/v2/chats/users`, {
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
    const unreadCountResponse = await fetch(`${baseHost}/chats/${chatId}/new`);
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
