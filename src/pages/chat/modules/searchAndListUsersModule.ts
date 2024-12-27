import App from '../../../App.ts';
import { state } from '../../../consts/consts';
import Block from '../../../framework/Block';
import { TContextChat, TInfoAvatar } from '../../../types/index.ts';
import { Avatar } from '../components/avatar';
import { HeaderSearch } from '../components/headerSearch';

interface TProps {
  props: {
    contextChat: TContextChat;
  };
}

export class SearchAndListUsersModule extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      HeaderSearch: new HeaderSearch({
        onClick: (e: Event) => this.redirectProfile(e),
      }),
      Avatars: props.props.contextChat.infoAvatar.map((item: TInfoAvatar) => new Avatar(item)),
    });
  }
  redirectProfile(e: Event) {
    e.preventDefault();
    if ((e.target as HTMLInputElement).id === 'goToProfile') {
      state.currentPage = '/profile';
      const app = new App();
      app.render();
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
