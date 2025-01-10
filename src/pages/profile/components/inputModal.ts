import Block from '../../../framework/Block';
import { TInput } from '../../../types';

export class InputModal extends Block {
  constructor(props: TInput) {
    super({
      ...props,
      classInput: props.classInput,
      inputId: props.inputId,
      placeholderInput: props.placeholderInput,
      typeInput: props.typeInput,
      value: props.value,
    });
  }
  render() {
    return `<div class="inputContainer">
                    <label class="labelInputModalProfile" for="{{inputId}}">
                        <input
                            name="{{{name}}}"
                            id="{{{inputId}}}"
                            class="{{{classInput}}}"
                            type="{{{typeInput}}}"
                            value="{{{value}}}"
                            required
                        />
                        {{#if value}}
                            <img class="fotoUser" src="{{{value}}}" alt="icon">
                        {{else}}
                            {{{placeholderInput}}}
                        {{/if}}
                </label>
                </div>
                `;
  }
}
