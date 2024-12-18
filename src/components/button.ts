/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Block from "../framework/Block";

export class Button extends Block {
  constructor(props: any = "") {
    super({
      ...props,
      textButton: props.textButton,
      classButton: props.classButton,
      idButton: props.idButton,
      typeButton: props.typeButton,
      events: {
        click: (e: Event) =>  props.onClick(e)
      },
    });
  }

  override render() {
    return `<button
              id="{{idButton}}"
              type="{{typeButton}}"
              class="{{classButton}}"
            >
              {{textButton}}
            </button>`;
  }
}
