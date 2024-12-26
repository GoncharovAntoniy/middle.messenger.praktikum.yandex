import Block from "../../../framework/Block";
import { TField } from "../../../types";

interface TProps extends TField{
  onChange: (e: Event, currentThis: any) => void;
  onBlur: (e: Event, currentThis: any) => void;
}

export class FieldInfoProfile extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        change: (e: Event) => props.onChange(e, this),
        focusout: (e: Event) => props.onBlur(e, this)
      }
    })
  }

  render() {
    return `<div class="fieldInfoProfile {{classInput}}">
              <p class="fieldInfoProfile_name">
                {{nameField}}
              </p>
              <input
                {{#if disabled}}
                  disabled
                {{/if}}
                name="{{name}}"
                class="fieldInfoProfile_input"
                value="{{value}}"
                type="{{typeInput}}"
                id="{{id}}"
              />
            </div>`
  }
}
