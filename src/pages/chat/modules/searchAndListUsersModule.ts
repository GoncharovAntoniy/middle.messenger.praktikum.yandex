import App from "../../../App.ts";
import { state } from "../../../consts/consts";
import Block from "../../../framework/Block";
import { Avatar } from "../components/avatar";
import { HeaderSearch } from "../components/headerSearch";

type TAvatar = {
    username: string,
    time: string,
    notReadMessageCount: string,
    lastMessage: string,
}

export class SearchAndListUsersModule extends Block {
    constructor(props: any) {
        super({
            ...props,
            HeaderSearch: new HeaderSearch({
                onClick: (e) => this.redirectProfile(e)
            }),
            Avatars: props.props.contextChat.infoAvatar.map((item:TAvatar) => new Avatar({
                username: item.username, 
                time: item.time, 
                notReadMessageCount: item.notReadMessageCount, 
                lastMessage: item.lastMessage,
                
            }))
        })
    }
    redirectProfile(e) {
        e.preventDefault()
        state.currentPage = '/profile'
        const app = new App()
        app.render()
    }
    override render() {
        return `<div>
                    {{{ HeaderSearch }}}
                    <div class="listUsers">
                        {{{ Avatars }}}
                    </div>
                </div>`
    }
}


