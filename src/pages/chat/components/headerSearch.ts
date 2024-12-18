import Block from "../../../framework/Block";
import { SearchChatInput } from "./searchChatInput";

export class HeaderSearch extends Block {
    constructor(props) {
        super({ ...props,
            SearchChatInput: new SearchChatInput({}),
            events: {
                click: (e) => props.onClick(e)
              }
         })
    }

    render() {
        return `<div class="headerSearch">
                    <button id="goToProfile" class="buttonProfile">
                        <p>
                            Профиль 
                        </p>
                        <span>
                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 9L5 5L1 1" stroke="#999999" />
                            </svg>
                        </span>
                    </button>
                    {{{ SearchChatInput }}}
                </div>
                `
    }
}


