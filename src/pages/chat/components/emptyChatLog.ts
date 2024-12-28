import Block from '../../../framework/Block';

type TProps = {
  emptyLog: boolean;
};

export class EmptyChatlog extends Block {
  constructor(props: TProps) {
    super(props);
  }
  render() {
    return `<div class="emptyChatLog">
            <p class="emptyChatLog_mess">Выберите чат чтобы отправить сообщение</p>
          </div>
          `;
  }
}
