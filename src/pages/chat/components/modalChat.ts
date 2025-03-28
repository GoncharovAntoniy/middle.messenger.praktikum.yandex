import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import Block from '../../../framework/Block';
import store, { connect, StoreEvents } from '../../../store/store';
import { IUser, TInput, TModalInfo } from '../../../types';
import chatController from '../chat-controller';
import { UserChatElement } from './userChatElement';

export interface TPropsModalChat extends TModalInfo {
  infoInput: TInput;
  // infoButton: TButton;
}

export class ModalChat extends Block {
  currentValueLogin = '';
  userIdList: number[] = [];
  constructor(props: TPropsModalChat) {
    super({
      ...props,
      Input: new Input({
        ...props.infoInput,
        onChange: (e: Event) => {
          const { value } = e.target as HTMLInputElement;
          this.currentValueLogin = value;
        },
        onBlur: (e: Event, currentThis: Input) => console.log(e, currentThis),
      }),
      Button: new Button({
        idButton: 'buttonAddUser',
        typeButton: 'submit',
        classButton: 'buttonAuth',
        textButton: 'Добавить',
        onClick: (event) => {
          event.preventDefault();
          this.addedUsersChat(this.userIdList);
        },
      }),
      SearchButton: new Button({
        idButton: 'buttonAddUser',
        typeButton: 'submit',
        classButton: 'buttonAuth',
        textButton: 'Найти юзеров',
        onClick: (event) => this.addUserSearch(event),
      }),
      ListUsers: null,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          chatController.addUserChat(this.currentValueLogin);
        },
        click: (e: Event) => {
          const attrClass = (e.target as HTMLInputElement).getAttribute('class');
          if (attrClass === 'modalChat__container') {
            e.stopPropagation();
          }
          if (attrClass === 'modalChat active') {
            store.set('modalInfo.className', 'modalChat');
          }
        },
      },
    });
    store.on(StoreEvents.Updated, () => {
      // console.log('store on');
    });
  }
  componentDidUpdate(oldProps: any, newProps: any): boolean {
    const listUsers = store.getState().modalInfo.listUsersSearch;
    if (oldProps?.listUsersSearch !== newProps?.listUsersSearch) {
      if (listUsers) {
        this.setLists({
          ListUsers: (listUsers as any).map(
            (item: IUser) =>
              new UserChatElement({
                ...item,
                onClick: (userId: number) => this.pushUser(userId),
                typeButton: 'button',
                classButton: 'userChatButton',
              }),
          ),
        });
      }
    }
    return true;
  }

  async addUserSearch(e: Event) {
    e.preventDefault();
    await chatController.addUserChat(this.currentValueLogin);
  }
  async addedUsersChat(users: number[]) {
    chatController.addUserToChat(users, Number(store.getState().currentChatId));
  }

  pushUser(userId: number) {
    this.userIdList.push(userId);
  }
  render() {
    return `<form class="{{className}}">
                    <div class="modalChat__container">
                        <h4 class="modalChat__container">{{title}}</h4>
                        {{{ Input }}}
                        {{{ Button }}}
                        {{{ SearchButton }}}
                        <div class="modalChat__container_listUsers">
                          {{{ ListUsers }}}
                        </div>
                    </div>
                </form>
                `;
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (state: Record<string, any>) => {
  return {
    title: state.contextChat.modalInfo.title,
    className: state.contextChat.modalInfo.className,
    infoInput: state.contextChat.modalInfo.infoInput,
    listUsersSearch: state.contextChat.modalInfo.listUsersSearch,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const modalChat = connect(mapStateToProps)(ModalChat as any);
