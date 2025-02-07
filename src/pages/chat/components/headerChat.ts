/* eslint-disable @typescript-eslint/no-explicit-any */
import Block from '../../../framework/Block';
import store, { connect, StoreEvents } from '../../../store/store';
import { TCurrentProps } from '../modules/messageModule';
import { ActionMenu } from './actionMenu';
import { avatar } from './avatar';
import { HeaderActions } from './headerActions';

interface TProps {
  openModalChat: (e: Event, currentProps: TCurrentProps) => void;
  props: {
    contextChat: {
      infoHeaderChat: {
        title: string;
      };
    };
  };
}

export class HeaderChat extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      Avatar: new avatar({ title: props.props?.contextChat.infoHeaderChat.title }),
      ActionMenu: new ActionMenu({ openModalChat: props.openModalChat, className: 'actionMenu' }),
      HeaderActions: new HeaderActions({ onClick: (e: Event) => this.showActionMenu(e) }),
    });
    store.on(StoreEvents.Updated, () => {
      // console.log('event on');
    });
  }

  showActionMenu(e: Event) {
    e.stopPropagation();
    const { className } = this.children.ActionMenu.getProps();
    if (className == 'actionMenu active') {
      this.children.ActionMenu.setProps({ className: 'actionMenu' });
    } else {
      this.children.ActionMenu.setProps({ className: 'actionMenu active' });
    }
  }
  render() {
    return `<div class="headerChat">
                    <div class="headerChat__avatarChat">
                        {{{ Avatar }}}
                    </div>
                    {{{ HeaderActions }}}
                   {{{ ActionMenu }}}
                </div>
                `;
  }
}
const mapStateToProps = (state: any) => ({
  props: {
    contextChat: { ...state.contextChat },
    emptyLog: { ...state.emptyLog },
    chatLogMessages: [...state.chatLogMessages],
  },
});
export const headerChat = connect(mapStateToProps)(HeaderChat as any);
