import Block from '../framework/Block';
import { TInput } from '../types';

interface TProps extends TInput {
  onChange: (e: Event, currentThis: any) => void;
  onBlur: (e: Event, currentThis: any) => void;
}

export class Input extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        change: (e: Event) => props.onChange(e, this),
        focusout: (e: Event) => props.onBlur(e, this),
      },
    });
  }

  render() {
    return `
    <div class="inputContainer" >
      <input
          name="{{name}}"
          id = "{{inputId}}"
          class="{{classInput}}"
          type = "{{typeInput}}"
          value="{{value}}"
          required
      />
      <label class="labelInput" for= "{{inputId}}" > {{ placeholderInput }}</label>
    </div>`;
  }
}
