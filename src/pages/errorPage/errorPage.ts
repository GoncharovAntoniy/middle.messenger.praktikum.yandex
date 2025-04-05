import { router } from '../../App';
import { Button } from '../../components/button';
import Block from '../../framework/Block';
import { TButton } from '../../types/index';

interface TProps {
  props: { backToChatBtn: TButton };
}

export class ErrorPage extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      Button: new Button({
        ...props.props.backToChatBtn,
        onClick: (e: Event) => this.backToChat(e),
      }),
    });
  }
  backToChat(e: Event) {
    e.preventDefault();
    router.go('/chat');
  }
  render() {
    return `<div id="app">
                    <main class="errorPage">
                        <div class="errorPage__codeSection">
                            <h3 class="errorPage__codeSection_code">{{props.errorCode}}</h3>
                            <p class="errorPage__codeSection_description">{{props.errorDescription}}</p>
                        </div>
                        {{{ Button }}}
                    </main>
                <div/>
                `;
  }
}
