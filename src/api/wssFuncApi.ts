export const WebsocketServise = (url: string) => {
  const socket = new WebSocket(url);
  socket.addEventListener('open', () => {
    console.log('Соединение установлено');
  });

  socket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener('message', (event) => {
    console.log('Получены данные', event.data);
  });

  socket.addEventListener('error', (event) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log('Ошибка', (event as Record<string, any>).message);
  });
};
