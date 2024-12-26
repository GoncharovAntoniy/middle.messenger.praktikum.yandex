import Block from "../../../framework/Block";
import { TButton } from "../../../types";

interface TProps extends TButton {
  onClick: (e: Event) => void
}

export class BackToChat extends Block {
  constructor(props: TProps) {
    super({...props,
      events: {
        click: (e: Event) => props.onClick(e)
      }
    })
  }
  render() {
    return `<button id="backToChat" class="profile__backToChat_btn" type="button">
              <img
                class="profile__backToChat_btn-icon"
                src="/images/back_arrow.svg"
                alt="icon"
              />
            </button>
            `
  }
}

