import Block from "../../../framework/Block";

export class FieldInfoProfile extends Block {
  constructor(props) {
    super({ ...props })
  }
  
  render() {
    return `<div class="fieldInfoProfile">
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

