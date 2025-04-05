import Block from '../../framework/Block';
import { TButton, TInput } from '../../types/index';
import { FormRegister } from './form';

interface TProps {
  props: {
    buttons: TButton[];
    inputs: TInput[];
  };
}

export class Register extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      FormRegister: new FormRegister({ ...props }),
    });
  }

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
