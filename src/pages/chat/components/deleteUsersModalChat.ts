import { Button } from '../../../components/button';
import Block from '../../../framework/Block';
import store, { connect, StoreEvents } from '../../../store/store';
import { IUser, TModalInfoDeleteUsers } from '../../../types';
import chatController from '../chat-controller';
import { UserChatElement } from './userChatElement';

export class DeleteUsersModalChat extends Block {
  userIdList: number[] = [];
  constructor(props: TModalInfoDeleteUsers) {
    super({
      ...props,
      Button: new Button({
        idButton: 'buttonAddUser',
        typeButton: 'submit',
        classButton: 'buttonAuth',
        textButton: 'Удалить',
        onClick: (event) => {
          event.preventDefault();
          this.deleteUsersChat(this.userIdList);
        },
      }),
      ListUsers: null,
      events: {
        click: (e: Event) => {
          const attrClass = (e.target as HTMLInputElement).getAttribute('class');
          if (attrClass === 'modalChat__container') {
            e.stopPropagation();
          }
          if (attrClass === 'modalChat active') {
            store.set('deleteUsersModalInfo.className', 'modalChat');
          }
        },
      },
    });
    store.on(StoreEvents.Updated, () => {
      // console.log('store on');
    });
  }
  componentDidUpdate(oldProps: any, newProps: any): boolean {
    const listUsers = store.getState().userInfo;
    if (oldProps?.chatId !== newProps?.chatId) {
      store.set('contextChat.deleteUsersModalInfo.listUsersSearch', listUsers);
    }
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

  async deleteUsersChat(users: number[]) {
    console.log(users);
    console.log(Number(store.getState().currentChatId));
    // Заменить на новую апи
    // chatController.addUserToChat(users, Number(store.getState().currentChatId));
  }

  pushUser(userId: number) {
    this.userIdList.push(userId);
  }
  render() {
    return `<form class="{{className}}">
                    <div class="modalChat__container">
                        <h4 class="modalChat__container">{{title}}</h4>
                        <div class="modalChat__container_listUsers">
                          {{{ ListUsers }}}
                        </div>
                        {{{ Button }}}
                    </div>
                </form>
                `;
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (state: Record<string, any>) => {
  return {
    title: state.contextChat.deleteUsersModalInfo.title,
    className: state.contextChat.deleteUsersModalInfo.className,
    chatId: state.contextChat.deleteUsersModalInfo.chatId,
    listUsersSearch: state.contextChat.deleteUsersModalInfo.listUsersSearch,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteUsersModalChat = connect(mapStateToProps)(DeleteUsersModalChat as any);
