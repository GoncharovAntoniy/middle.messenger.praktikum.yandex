import Block from '../../../framework/Block';
import { TContextChat } from '../../../types/index';
import { validationFormInput } from '../../../utils/validationFormInput';
import chatController from '../chat-controller';
import { ButtonSubmitChat } from './buttonSubmitChat';
import { InputSubmitAction } from './inputSubmitAction';
import { InputSubmitChat } from './inputSubmitChat';
import { SubmitFormActions } from './SubmitFormActions';

interface TProps {
  props: {
    contextChat: TContextChat;
  };
  contextChat: TContextChat;
}

export class SubmitInput extends Block {
  public inputValue: string;
  constructor(props: TProps) {
    super({
      ...props,
      ActionSubmit: new InputSubmitAction({
        onClick: () => this.openMenuActions(),
      }),
      SubmitFormActions: new SubmitFormActions({
        ...props,
        className: 'submitFormMessage__actions',
      }),
      InputSubmitChat: new InputSubmitChat({
        ...props.props.contextChat.infoSubmitInput,
        onBlur: (e: Event, currentThis: object) => {
          e.preventDefault();
          validationFormInput(e, currentThis);
        },
        onChange: (e: Event) => {
          e.preventDefault();
          this.changeInput(e);
        },
      }),

      ButtonSubmitChat: new ButtonSubmitChat({}),
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          await chatController.sendMessage('message', this.inputValue);
          this.inputValue = '';
        },
      },
    });
    this.inputValue = '';
  }

  openMenuActions() {
    const isActive = this.children.SubmitFormActions.getProps().className;
    if (isActive == 'submitFormMessage__actions active') {
      this.children.SubmitFormActions.setProps({ className: 'submitFormMessage__actions' });
    } else {
      this.children.SubmitFormActions.setProps({ className: 'submitFormMessage__actions active' });
    }
  }

  changeInput(e: Event) {
    e.preventDefault();
    this.inputValue = (e.target as HTMLInputElement).value;
  }

  render() {
    return `<form class="submitFormMessage" action="">
              {{{ ActionSubmit }}}
              {{{ InputSubmitChat }}}
              {{{ ButtonSubmitChat }}}
              {{{ SubmitFormActions }}}
            </form>`;
  }
}
