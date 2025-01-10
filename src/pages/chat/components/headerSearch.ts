import Block from '../../../framework/Block';
import { SearchChatInput } from './searchChatInput';

type TProps = {
  onClick: (e: Event) => void;
};

export class HeaderSearch extends Block {
  valueSearchInput = '';
  constructor(props: TProps) {
    super({
      ...props,
      SearchChatInput: new SearchChatInput({ onChange: (e: Event) => this.changeInputSearch(e) }),
      events: {
        click: (e: Event) => props.onClick(e),
      },
    });
  }

  changeInputSearch(e: Event) {
    this.valueSearchInput = (e.target as HTMLInputElement).value;
    this.children.SearchChatInput.setProps({ value: this.valueSearchInput });
    console.log(e.target);
  }

  render() {
    return `<div class="headerSearch">
                    <button id="goToProfile" class="buttonProfile">
                        Профиль 
                        <span>
                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 9L5 5L1 1" stroke="#999999" />
                            </svg>
                        </span>
                    </button>
                    {{{ SearchChatInput }}}
                </div>
                `;
  }
}
