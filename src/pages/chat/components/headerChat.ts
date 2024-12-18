import Block from "../../../framework/Block";
import { Avatar } from "./avatar";

export class HeaderChat extends Block {
    constructor(props) {
        super({...props,
            Avatar: new Avatar({username: 'test'})
        })
    }
    render() {
        return`<div class="headerChat">
                    <div class="headerChat__avatarChat">
                        {{{ Avatar }}}
                    </div>
                    <div id="headerActions" class="headerChat__actions">
                        <span class="headerChat__actions_dotAction"></span>
                        <span class="headerChat__actions_dotAction"></span>
                        <span class="headerChat__actions_dotAction"></span>
                    </div>
                    <div class="actionMenu">
                        <div id="addedUser" class="actionMenu__item">
                            <span class="actionMenu__item_addUser">
                                +
                            </span>
                            <p class="actionMenu__item_text">Добавить пользователя</p>
                        </div>
                        <div id="deleteUser" class="actionMenu__item">
                            <span class="actionMenu__item_deleteUser">
                                +
                            </span>
                            <p class="actionMenu__item_text">Удалить пользователя</p>
                        </div>
                    </div>
                </div>
                `
    }
}

