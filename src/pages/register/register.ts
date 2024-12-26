import App from "../../App.ts";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { state } from "../../consts/consts";
import Block from "../../framework/Block";
import { TButton, TInput } from "../../types/index.ts";
import { validationFormInput } from "../../utils/validationFormInput.ts";

interface TProps {
    props: {
      buttons: TButton[];
      inputs: TInput[];
    }
  }

export class Register extends Block {
    dictInputsValue:Record<string, string | number> = {}
    constructor(props: TProps) {
        super({
            ...props,
            Inputs: props.props.inputs.map((item: TInput) => new Input({
                name: item.name,
                inputId: item.inputId,
                classInput: item.classInput,
                typeInput: item.typeInput,
                placeholderInput: item.placeholderInput,
                onChange: (e: Event, currentThis: any) => this.changeInputValue(e, currentThis),
                onBlur: (e: Event, currentThis: any) => validationFormInput(e, currentThis)
            })),
            Buttons: props.props.buttons.map((item: TButton) => new Button({
                classButton: item.classButton,
                idButton: item.idButton,
                textButton: item.textButton,
                typeButton: item.typeButton,
                onClick: (e: Event) => this.changeClickButtons(e)
            }))
        });
    }

    changeClickButtons(e: Event) {
        e.preventDefault()
        console.log(e.currentTarget)
        const app = new App()
        if ((e.currentTarget as HTMLInputElement).id === "registerBtn") {
            return
        }
        if ((e.currentTarget as HTMLInputElement).id === "loginBtn") {
          state.currentPage = "/login"
        }
        app.render()
      }

      changeInputValue(e: Event, currentThis: any) {
        const {name, value} = e.target as HTMLInputElement
        this.dictInputsValue[name] = value
        currentThis.setProps({value})
        console.log(this.dictInputsValue)
      }

    render() {
        return `
        <div id="app">
            <main>
                <form action="" class="form">
                    <div class="fields">
                        <h2 class="register__title">Регистрация</h2>

                        <div class="inputs">
                        {{{Inputs}}}
                        </div>
                    </div>

                    <div class="form__buttons">
                    {{{Buttons}}}
                    </div>
                </form>
            </main>
        <div/>
        `
    }
}

