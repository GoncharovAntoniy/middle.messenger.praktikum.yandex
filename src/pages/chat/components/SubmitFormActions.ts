import Block from "../../../framework/Block";
import { TContextChat, TSubmitActionItem } from "../../../types";
import { SubmitFormActionItem } from "./SubmitFormActionItem";

interface TProps {
    props: {
        contextChat: TContextChat;
    };
    contextChat: TContextChat;
    className: string;
}

export class SubmitFormActions extends Block {
    constructor(props: TProps) {
        super({
            ...props,
            ActionsSubmit: props.props.contextChat.submitActionsItem.map((item: TSubmitActionItem) => new SubmitFormActionItem({
                ...item, 
                onClick: (e: Event) => console.log(e)}))
        })
    }

    render() {
        return `
            <div class="{{className}}">
               {{{ ActionsSubmit }}}
            </div>
        `
    }
}
