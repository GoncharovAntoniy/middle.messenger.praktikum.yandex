import Block from '../../../framework/Block';
import { TCurrentProps } from '../modules/messageModule';
import { ActionMenu } from './actionMenu';
import { Avatar } from './avatar';
import { HeaderActions } from './headerActions';

interface TProps {
  openModalChat: (e: Event, currentProps: TCurrentProps) => void;
}

export class HeaderChat extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      Avatar: new Avatar({ username: 'test' }),
      ActionMenu: new ActionMenu({ openModalChat: props.openModalChat, className: 'actionMenu' }),
      HeaderActions: new HeaderActions({ onClick: (e: Event) => this.showActionMenu(e) }),
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
