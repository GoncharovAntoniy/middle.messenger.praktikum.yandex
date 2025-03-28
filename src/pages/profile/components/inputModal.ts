import Block from '../../../framework/Block';
import { connect } from '../../../store/store';
import { TInput } from '../../../types';

interface TProps extends TInput {
  onChange: (e: Event) => void;
}

export class InputModal extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      classInput: props.classInput,
      inputId: props.inputId,
      placeholderInput: props.placeholderInput,
      typeInput: props.typeInput,
      value: props.value,
      events: {
        change: (event: Event) => props.onChange(event),
      },
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

const mapStateToProps = (state: any) => {
  return {
    props: {
      classInput: state.classInput,
      inputId: state.inputId,
      placeholderInput: state.placeholderInput,
      typeInput: state.typeInput,
      value: state.value,
    },
  };
};

export const inputModal = connect(mapStateToProps)(InputModal as any);
