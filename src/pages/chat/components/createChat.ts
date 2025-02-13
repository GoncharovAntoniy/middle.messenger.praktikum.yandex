import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import Block from '../../../framework/Block';
import chatController from '../chat-controller';

export class CreateChat extends Block {
  public valueInput: string;
  private inputThis: Input | null;
  constructor(props: any) {
    super({
      ...props,
      Button: new Button({
        idButton: 'addUser',
        typeButton: 'submit',
        classButton: 'listUsers_addUser_form_item',
        textButton: '+',
        onClick: (event) => this.createChat(event),
      }),
      Input: new Input({
        name: 'addChatInput',
        inputId: 'addChatInput',
        classInput: 'input',
        typeInput: 'text',
        placeholderInput: 'Введите название чата',
        onBlur: () => null,
        onChange: (event: Event, currentThis: Input) => this.changeInput(event, currentThis),
      }),
      events: {
        submit: (event: Event) => this.createChat(event),
      },
    });
    this.valueInput = '';
    this.inputThis = null;
  }

  changeInput(event: Event, currentThis: Input) {
    this.valueInput = (event.target as HTMLInputElement).value;
    this.inputThis = currentThis;
    currentThis.setProps({ value: this.valueInput });
  }
  createChat(event: Event) {
    event.preventDefault();
    chatController.setListUsers(this.valueInput);
    this.valueInput = '';
    this.inputThis?.setProps({ value: '' });
  }

  render() {
    console.log(this);
    return `<div class="listUsers_addUserBtn">
                <form class="listUsers_addUser_form">
                    {{{ Input }}}
                    {{{ Button }}}
                <form/>
            </div>
            `;
  }
}
