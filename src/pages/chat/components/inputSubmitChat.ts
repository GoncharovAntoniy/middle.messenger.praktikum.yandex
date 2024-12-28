import { Input } from '../../../components/input';
import Block from '../../../framework/Block';

interface TProps {
  onChange: (e: Event) => void;
  onBlur: (e: Event, currentThis: Input) => void;
}

export class InputSubmitChat extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        change: (e: Event) => props.onChange(e),
        focusout: (e: Event) => props.onBlur(e, this),
      },
    });
  }

  render() {
    return `
                <input
                    id="{{id}}"
                    class="{{classInput}}"
                    type="{{type}}"
                    name="{{name}}"
                    placeholder="Сообщение"
              />`;
  }
}
