import Block from '../../../framework/Block';

export class EmptyChatlog extends Block {
  render() {
    return `<div class="emptyChatLog">
            <p class="emptyChatLog_mess">Выберите чат чтобы отправить сообщение</p>
          </div>
          `;
  }
}
