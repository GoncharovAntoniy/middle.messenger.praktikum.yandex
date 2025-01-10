// import App from '../../App';
// import { Button } from '../../components/button';
// import { Input } from '../../components/input';
// import { state } from '../../consts/consts';
import Block from '../../framework/Block';
import { TButton, TInput } from '../../types/index';
// import { validationFormInput } from '../../utils/validationFormInput';
import { FormRegister } from './form';

interface TProps {
  props: {
    buttons: TButton[];
    inputs: TInput[];
  };
}

export class Register extends Block {
  // dictInputsValue: Record<string, string | number> = {};
  constructor(props: TProps) {
    super({
      ...props,
      FormRegister: new FormRegister({ ...props }),
    });
  }

  // changeClickButtons(e: Event) {
  //   e.preventDefault();
  //   console.log(e.currentTarget);
  //   const app = new App();
  //   if ((e.currentTarget as HTMLInputElement).id === 'registerBtn') {
  //     return;
  //   }
  //   if ((e.currentTarget as HTMLInputElement).id === 'loginBtn') {
  //     state.currentPage = '/login';
  //   }
  //   app.render();
  // }

  // changeInputValue(e: Event, currentThis: Input) {
  //   const { name, value } = e.target as HTMLInputElement;
  //   this.dictInputsValue[name] = value;
  //   currentThis.setProps({ value });
  //   console.log(this.dictInputsValue);
  // }

  render() {
    return `
        <div id="app">
            <main>
                {{{ FormRegister }}}
            </main>
        <div/>
        `;
  }
}
