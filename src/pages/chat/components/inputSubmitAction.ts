import Block from "../../../framework/Block";

interface TProps {
    onClick: () => void
}

export class InputSubmitAction extends Block {
    constructor(props: TProps) {
        super({
            ...props,
            events: {
                click: () => props.onClick()
            }
        })
    }

    render() {
        console.log(this.props)
        return `
                <img
                    id="inputSubmitAction"
                    class="submitFormMessage__action"
                    src="/images/paperclipIcon.svg"
                    alt="icon"
                />`
    }
}
