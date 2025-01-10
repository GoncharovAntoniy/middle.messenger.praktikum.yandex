import App from '../../App';
import { Button } from '../../components/button';
import { state } from '../../consts/consts';
import Block from '../../framework/Block';
import { TButton } from '../../types/index';

interface TProps {
  backToChatBtn: TButton;
}

export class ErrorPage extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      Button: new Button({
        ...props.backToChatBtn,
        onClick: (e: Event) => this.backToChat(e),
      }),
    });
  }
  backToChat(e: Event) {
    e.preventDefault();
    state.currentPage = '/chat';
    const app = new App();
    app.render();
  }
  render() {
    return `<div id="app">
                    <main class="errorPage">
                        <div class="errorPage__codeSection">
                            <h3 class="errorPage__codeSection_code">{{errorCode}}</h3>
                            <p class="errorPage__codeSection_description">{{errorDescription}}</p>
                        </div>
                        {{{ Button }}}
                    </main>
                <div/>
                `;
  }
}
