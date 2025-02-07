import store from '../store/store';

export class WebSocketService {
  private socket: WebSocket | null = null;
  private url: string;
  private reconnectInterval = 5000;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private pingInterval: NodeJS.Timeout | null = null;
  private isLoadingMessages = false; // Флаг загрузки сообщений

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('✅ WebSocket соединение установлено');
      this.reconnectAttempts = 0;
      this.startPing();
      this.loadAllMessages();
      setTimeout(() => this.getMessages(), 500);
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📩 Получено сообщение:', data);
        if (data.type === 'pong' || data.type === 'ping') {
          return;
        }
        console.log('Received JSON:', data);
        store.set('chatLogMessages', [...(store.getState().chatLogMessages || []), data]);

        if (Array.isArray(data)) {
          // const chatLogMessages = store.getState().chatLogMessages || [];
          store.set('chatLogMessages', [...data.reverse()]);
          this.isLoadingMessages = false;
        } else {
          store.set('chatLogMessages', [...(store.getState().chatLogMessages || []), data]);
        }
      } catch {
        console.warn('Received non-JSON message:', event.data);
      }
    };

    this.socket.onerror = (error) => {
      console.error('❌ WebSocket ошибка:', error);
    };

    this.socket.onclose = (event) => {
      console.warn(`⚠️ WebSocket закрыт, код: ${event.code}, причина: ${event.reason}`);
      this.stopPing();

      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          console.log('🔄 Переподключение...');
          this.reconnectAttempts++;
          this.connect();
        }, this.reconnectInterval);
      }
    };
  }

  public getMessages(offset = 0) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'get old', content: String(offset) }));
      console.log(`📩 Запрос сообщений с offset=${offset}`);
    } else {
      console.warn('⚠️ WebSocket не открыт, невозможно запросить сообщения');
    }
  }

  private async loadAllMessages() {
    if (this.isLoadingMessages) return;
    this.isLoadingMessages = true;

    let totalMessages = 0;
    let receivedMessages = 0;
    const chatId = store.getState().currentChatId;

    if (!chatId) return console.warn('⚠️ Чат не выбран');

    try {
      // Запрашиваем количество непрочитанных сообщений через API
      const response = await fetch(`https://ya-praktikum.tech/api/v2/chats/new/${chatId}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: { Authorization: `Bearer ${store.getState().token}` },
      });
      const count = await response.json();
      totalMessages = count.unread_count || 0;
      console.log(`📊 Всего непрочитанных сообщений: ${totalMessages}`);
    } catch (error) {
      console.error('❌ Ошибка при получении количества сообщений:', error);
      return;
    }

    // Запрашиваем сообщения порциями по 20
    let offset = 0;
    while (receivedMessages < totalMessages) {
      this.getMessages(offset);
      receivedMessages += 20;
      offset += 20;
      await new Promise((resolve) => setTimeout(resolve, 500)); // Ждем 500 мс перед следующим запросом
    }
  }

  public send(data: object) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn('⚠️ WebSocket не открыт, невозможно отправить сообщение');
    }
  }

  public close() {
    this.stopPing();
    this.socket?.close(1000, 'Соединение закрыто пользователем');
  }

  private startPing() {
    this.pingInterval = setInterval(() => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ type: 'ping' }));
        console.log('📡 Пинг отправлен');
      }
    }, 10000);
  }

  private stopPing() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
}
