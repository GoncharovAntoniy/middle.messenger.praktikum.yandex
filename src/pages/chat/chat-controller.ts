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
        // store.set('contextChat.modalInfo.className', 'modalChat');
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

  public async getMessagesUser(chatId: number, title: string) {
    const tokenRes = await chatApi.getMessagesChat(chatId).then((res) => res.json());
    store.set('token', tokenRes.token);

    const userData = await chatApi.getUserChat(chatId).then((res) => res.json());
    store.set('userInfo', userData);
    store.set('contextChat.infoHeaderChat.title', title);
    store.set('currentChatId', chatId);

    const userId = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const token = store.getState().token;

    if (userId && token) {
      this.ws = new WebSocketService(`wss://ya-praktikum.tech/ws/chats/${(userId as any).id}/${chatId}/${token}`);
      this.ws.getMessages();
    }
    this.ws;
    const infoAvatar = store.getState().contextChat.infoAvatar;
    const newDataInfoAvatar = infoAvatar.map((item) => (item.id === chatId ? { ...item, currentChatClass: 'avatar activeAvatar' } : { ...item, currentChatClass: 'avatar' }));
    store.set('contextChat.infoAvatar', newDataInfoAvatar);
  }

  public sendMessage(type: string, message: string) {
    if (this.ws) {
      this.ws.send({ type: type, content: message });
    } else {
      console.error('WebSocket не инициализирован');
    }
  }

  public closeWS() {
    console.log('click close');
    this.ws.close();
  }

  public async addUserChat(login: string) {
    await chatApi.userSearch(login);
  }
  public async addUserToChat(users: any, chatId: number) {
    chatApi.addUserToChat({ users, chatId });
  }
}

export default new ChatController();
