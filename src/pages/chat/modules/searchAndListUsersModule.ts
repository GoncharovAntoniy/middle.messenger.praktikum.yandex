/* eslint-disable @typescript-eslint/no-explicit-any */
import { router } from '../../../App';
import Block from '../../../framework/Block';
import store, { connect, StoreEvents } from '../../../store/store';
import { TInfoAvatar } from '../../../types/index';
import { isEqualAuthor } from '../../../utils/isEqualUtil';
import chatController from '../chat-controller';
import { Avatar } from '../components/avatar';
import { HeaderSearch } from '../components/headerSearch';

interface TProps {
  props: {
    infoAvatar: TInfoAvatar[];
  };
}

export class SearchAndListUsersModule extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      HeaderSearch: new HeaderSearch({
        onClick: (e: Event) => this.redirectProfile(e),
      }),
      Avatars: [],
    });
    chatController.getListUsers();
    store.on(StoreEvents.Updated, () => {
      // console.log('store on');
    });
  }
  componentDidUpdate(oldProps: TProps, newProps: TProps) {
    if (oldProps.props?.infoAvatar !== undefined || newProps.props?.infoAvatar !== undefined) {
      if (!isEqualAuthor(oldProps.props?.infoAvatar, newProps.props?.infoAvatar)) {
        this.setLists({
          Avatars: newProps.props?.infoAvatar.map((item: TInfoAvatar) =>
            item.id === store.getState().currentChatId ? new Avatar({ ...item, currentChatClass: 'avatar active' }) : new Avatar(item),
          ),
        });
        this.setProps({ ...newProps.props });
      }
    }
    return true;
  }
  redirectProfile(e: Event) {
    e.preventDefault();
    if ((e.target as HTMLInputElement).id === 'goToProfile') {
      router.go('/profile');
    }
  }
  render() {
    return `<div>
                    {{{ HeaderSearch }}}
                    <div class="listUsers">
                        {{{ Avatars }}}
                    </div>
                </div>`;
  }
}
const mapStateToProps = (state: any) => ({
  props: {
    infoAvatar: state.contextChat.infoAvatar,
  },
});
export const searchAndListUsersModule = connect(mapStateToProps)(SearchAndListUsersModule as any);
