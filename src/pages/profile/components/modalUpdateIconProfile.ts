import { Button } from "../../../components/button";
import Block from "../../../framework/Block";
import { TButton, TInput } from "../../../types";
import { InputModal } from "./inputModal";

interface TProps {
    props: {
        infoInput: TInput;
        infoButton: TButton;
    }
}

export class ModalProfile extends Block {
    constructor(props: TProps) {
        super({
            ...props,
            InputModalProfile: new InputModal({
                ...props.props.infoInput
            }),
            Button: new Button({ ...props.props.infoButton, onClick: (e: Event, currentThis: any) => console.log(e, currentThis) })
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

