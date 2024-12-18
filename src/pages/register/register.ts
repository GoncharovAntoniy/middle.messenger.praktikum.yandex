import App from "../../App.ts";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { state } from "../../consts/consts";
import Block from "../../framework/Block";

export class Register extends Block {
    constructor(props: any = '') {
        super({
            ...props,
            Inputs: props.props.inputs.map((item: any) => new Input({
                name: item.name,
                inputId: item.inputId,
                classInput: item.classInput,
                typeInput: item.typeInput,
                placeholderInput: item.placeholderInput,
            })),
            Buttons: props.props.buttons.map((item: any) => new Button({
                classButton: item.classButton,
                idButton: item.idButton,
                textButton: item.textButton,
                typeButton: item.typeButton,
                onClick: (e) => this.changeClickButtons(e)
            }))
        });
    }

    changeClickButtons(e) {
        e.preventDefault()
        console.log(e.currentTarget)
        const app = new App()
        if (e.currentTarget.id === "registerBtn") {
            // state.currentPage = "/chat"
            return
        }
        if (e.currentTarget.id === "loginBtn") {
          state.currentPage = "/login"
        }
        app.render()
      }
    override render() {
        
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

