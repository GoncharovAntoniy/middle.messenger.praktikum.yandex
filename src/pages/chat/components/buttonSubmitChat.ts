import Block from "../../../framework/Block";

export class ButtonSubmitChat extends Block {

    render() {
        return `
            <button class="submitFormMessage__button" type="submit"><img
                  src="/images/arrowRightIcon.svg"
                  alt=""
            /></button>
        `
    }
}