import Block from '../../framework/Block';
// import store, { StoreEvents } from '../../store/store';
import { TButton, TInput } from '../../types/index';
import { FormLogin } from './form';

interface TProps {
  props: {
    buttons: TButton[];
    inputs: TInput[];
  };
}

export class Login extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      FormLogin: new FormLogin({ ...props }),
    });
  }

  render() {
    return `
        <div id="app">
            <main>
                {{{ FormLogin }}}
            </main>
        </div>`;
  }
}
