import Block from '../../../framework/Block';

type TCurrentProps = {
  title: string;
  textButton: string;
  idButton: string;
};

type TProps = {
  idAction: string;
  idButton: string;
  item_text: string;
  onClick: (e: Event, currentProps: TCurrentProps) => void;
  title: string;
  textButton: string;
};

export class ActionMenuItem extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        click: (e: Event) =>
          props.onClick(e, {
            title: props.title,
            textButton: props.textButton,
            idButton: props.idButton,
          }),
      },
    });
  }
  render() {
    return `
            <div id="{{idAction}}" class="actionMenu__item">
                <span class="actionMenu__item_addUser">
                    +
                </span>
                <p class="actionMenu__item_text">{{item_text}}</p>
            </div>
            `;
  }
}
