import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { dictInput } from '../../consts/consts';
import Block from '../../framework/Block';
import { TButton, TInput } from '../../types';
import { validationFormInput } from '../../utils/validationFormInput';
import { router } from '../../App';
import { LoginApi } from '../../api/login-api';

interface TProps {
  props: {
    buttons: TButton[];
    inputs: TInput[];
  };
}

export class FormLogin extends Block {
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
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          (e: Event) => this.changeClickButtons(e);
          console.log(dictInput);
        },
      },
    });
  }

  changeClickButtons(e: Event) {
    e.preventDefault();
    if ((e.currentTarget as HTMLElement).id === 'authBtn') {
      const isFalsArray: boolean[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.lists.Inputs.forEach((item: any) => {
        if (item.props.classInput == 'input errorInput') {
          isFalsArray.push(false);
        } else {
          isFalsArray.push(true);
        }
      });
      const isBool = isFalsArray.some((item) => item === false);
      if (!isBool && isFalsArray.length !== 0) {
        const login = new LoginApi();
        login.login(this.dictInputsValue);
      }
    }
    if ((e.currentTarget as HTMLElement).id === 'linkBtn') {
      router.go('/register');
    }
  }

  changeInputValue(e: Event, currentThis: Input) {
    const { name, value } = e.target as HTMLInputElement;
    this.dictInputsValue[name] = value;
    currentThis.setProps({ value });
    console.log(this.dictInputsValue);
  }

  render(): string {
    return `
            <form action="" class="form">
                <div class="fields">
                    <h2 class="login__title">{{{ props.title }}}</h2>
                    <div class="inputs">
                    {{{Inputs}}}
                    </div>
                </div>

                <div class="form__buttons">
                    {{{Buttons}}}
                </div>
            </form>
        `;
  }
}
