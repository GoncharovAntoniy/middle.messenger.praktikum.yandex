import App from '../../App';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { state } from '../../consts/consts';
import Block from '../../framework/Block';
import { TButton, TInput } from '../../types/index';
import { validationFormInput } from '../../utils/validationFormInput';

interface TProps {
  props: {
    buttons: TButton[];
    inputs: TInput[];
  };
}

export class Login extends Block {
  dictInputsValue: Record<string, string | number> = {};
  constructor(props: TProps) {
    super({
      ...props,
      Inputs: props.props.inputs.map(
        (item: TInput) =>
          new Input({
            ...item,
            onChange: (e, currentThis) => this.changeInputValue(e, currentThis),
            onBlur: (e, currentThis) => validationFormInput(e, currentThis),
          }),
      ),
      Buttons: props.props.buttons.map(
        (item: TButton) =>
          new Button({
            ...item,
            onClick: (e) => this.changeClickButtons(e),
          }),
      ),
    });
  }

  changeClickButtons(e: Event) {
    e.preventDefault();
    // console.log(e.currentTarget)
    const app = new App();
    if ((e.currentTarget as HTMLElement).id === 'authBtn') {
      state.currentPage = '/chat';
    }
    if ((e.currentTarget as HTMLElement).id === 'linkBtn') {
      state.currentPage = '/register';
    }
    app.render();
  }

  changeInputValue(e: Event, currentThis: Input) {
    const { name, value } = e.target as HTMLInputElement;
    this.dictInputsValue[name] = value;
    currentThis.setProps({ value });
    console.log(this.dictInputsValue);
  }

  render() {
    return `
        <div id="app">
            <main>
                <form action="" class="form">
                    <div class="fields">
                        <h2 class="login__title">Вход</h2>
                        <div class="inputs">
                        {{{Inputs}}}
                        </div>
                    </div>

                    <div class="form__buttons">
                        {{{Buttons}}}
                    </div>
                </form>
            </main>
        </div>`;
  }
}
