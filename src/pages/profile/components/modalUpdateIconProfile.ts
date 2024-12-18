import { Button } from "../../../components/button";
import Block from "../../../framework/Block";
import { InputModal } from "./inputModal";

export class ModalProfile extends Block {
    constructor(props) {
        super({
            ...props,
            InputModalProfile: new InputModal({
                ...props.props.infoInput
            }),
            Button: new Button({ ...props.props.infoButton })
        })
    }

    render() {
        const title = this.props.props.title
        return `<div class="modalProfile">
                    <div class="modalProfile__container">
                        <h4 class="modalProfile__container_title">${title}</h4>
                        {{{InputModalProfile}}}
                        {{{ Button }}}
                    </div>
                </div>
                `
    }
}

