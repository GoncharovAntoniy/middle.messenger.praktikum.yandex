/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatApi } from '../../api/chat-api';
import { WebSocketService } from '../../api/wss-api';
import store from '../../store/store';

const chatApi = new ChatApi();

class ChatController {
  public ws: any;
  constructor() {
    this.ws = null;
  }
  public getListUsers() {
    chatApi.getChats().then((data) => {
      store.set('contextChat.infoAvatar', data);
      store.set('contextChat.infoHeaderChat.title', '');
    });
  }
  public setListUsers(title: string) {
    chatApi.createChat(title).then((data) => {
      if ((data as any).id) {
        this.getListUsers();
        store.set('contextChat.modalInfo.className', 'modalChat');
      }
    });
  }

  public deleteUserChat(id: number) {
    chatApi.deleteChat(id).then((data) => {
      if (data) {
        this.getListUsers();
        store.set('contextChat.modalInfo.className', 'modalChat');
        store.set('chatLogMessages', []);
        store.set('currentChatId', '');
      }
    });
  }

  public async getMessagesUser(chatId: number) {
    const tokenRes = await chatApi.getMessagesChat(chatId).then((res) => res.json());
    store.set('token', tokenRes.token);

    const userData = await chatApi.getUserChat(chatId).then((res) => res.json());
    store.set('userInfo', userData[0]);
    store.set('contextChat.infoHeaderChat.title', userData[1].first_name);
    store.set('currentChatId', chatId);

    const userId = JSON.parse(localStorage.getItem('userInfo'));
    const token = store.getState().token;

    if (userId && token) {
      this.ws = new WebSocketService(`wss://ya-praktikum.tech/ws/chats/${(userId as any).id}/${chatId}/${token}`);
      this.ws.getMessages();
    }
    this.ws;
    const infoAvatar = store.getState().contextChat.infoAvatar;
    console.log('infoAvatar', infoAvatar);
    const newDataInfoAvatar = infoAvatar.map((item) => (item.id === chatId ? { ...item, currentChatClass: 'avatar activeAvatar' } : { ...item, currentChatClass: 'avatar' }));
    store.set('contextChat.infoAvatar', newDataInfoAvatar);
    console.log(store.getState());
  }

  public sendMessage(type: string, message: string) {
    if (this.ws) {
      this.ws.send({ type: type, content: message });
    } else {
      console.error('WebSocket не инициализирован');
    }
  }

  public closeWS() {
    this.ws.close();
  }
}

export default new ChatController();
