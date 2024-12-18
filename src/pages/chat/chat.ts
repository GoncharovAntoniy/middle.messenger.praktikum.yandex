import Block from "../../framework/Block"
import { MessageModule } from "./modules/messageModule"
import { SearchAndListUsersModule } from "./modules/searchAndListUsersModule"

export class Chat extends Block {
    constructor(props: any) {
        super({
            ...props,
            SearchAndListUsersModule: new SearchAndListUsersModule({...props}),
            MessageModule: new MessageModule({...props})
        })
    }
    override render() {
        return `
            <div id="app">
                <main class="chatContainer">
                    <section class="chatContainer__leftSection">
                        {{{ SearchAndListUsersModule }}}
                    </section>
                    <section class="chatContainer__rightSection">
                        {{{ MessageModule }}}
                    </section>
                </main>
            <dic/>`

    }
}

// {{{SearchAndListUsersModule}}}
// {{> SearchAndListUsersModule infoAvatar=infoAvatar}}

// {{> MessageModule 
//     emptyLog=emptyLog 
//     chatLogMessages=chatLogMessages
// }}