import Block from "../framework/Block"

export class Input extends Block {
  constructor(props: any = "") {
    super({
      ...props,
      name: props.name,
      inputId: props.inputId,
      classInput: props.classInput,
      typeInput: props.typeInput,
      placeholderInput: props.placeholderInput,
    })
  }

  override render() {
    return `
    <div class="inputContainer" >
      <input
          name="{{name}}"
          id = "{{inputId}}"
          class="{{classInput}}"
          type = "{{typeInput}}"
          required
      />
      <label class="labelInput" for= "{{inputId}}" > {{ placeholderInput }}</label>
    </div>`
  }
}
