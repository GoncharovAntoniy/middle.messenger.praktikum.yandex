import Block from "../../../framework/Block";

export class BackToChat extends Block {
  constructor(props) {
    super({...props,
      events: {
        click: (e) => props.onClick(e)
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

