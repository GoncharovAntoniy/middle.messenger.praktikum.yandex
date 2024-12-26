import Block from "../../../framework/Block";

type TProps = {
    onClick: (e: Event) => void
}

export class HeaderActions extends Block {
    constructor(props: TProps) {
        super({
            ...props,
            events: {
                click: (e: Event) => props.onClick(e)
            }
        })
    }
    render() {
        return ` <div id="headerActions" class="headerChat__actions">
                    <span class="headerChat__actions_dotAction"></span>
                    <span class="headerChat__actions_dotAction"></span>
                    <span class="headerChat__actions_dotAction"></span>
                </div>`
    }
}
