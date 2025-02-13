/* eslint-disable @typescript-eslint/no-empty-function */
import { state } from './consts/consts';
import Router from './framework/router';
import ConnectedChat from './pages/chat';
import ConnectedErrorPage from './pages/errorPage';
import ConnectedLogin from './pages/login';
import ConnectedProfile from './pages/profile';
import ConnectedRegister from './pages/register';
import store, { StoreEvents } from './store/store';
import { TState } from './types';

export const router = new Router('#app');
export default class App {
  public state: TState;
  private appElement: HTMLElement | null;

  constructor() {
    this.state = state;
    this.appElement = document.getElementById('app');
    store.on(StoreEvents.Updated, () => {});
  }

  render(): string {
    router.use('/', ConnectedLogin).use('/register', ConnectedRegister).use('/chat', ConnectedChat).use('/profile', ConnectedProfile).use('/errorPage', ConnectedErrorPage).start();
    if (window.location.pathname === '/chat') {
      if (this.appElement) {
        const rigthBlock = document.querySelector('.chatContainer__rightSection');
        if (rigthBlock) {
          rigthBlock.scrollTo({
            top: rigthBlock.scrollHeight,
            left: 0,
            behavior: 'auto',
          });
        }
      }
    }
    return '';
  }
}
