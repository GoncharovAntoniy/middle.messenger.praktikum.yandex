import Block from "../../../framework/Block";

export class ModalChat extends Block {
    constructor(props) {
        super({ ...props })
    }

    render() {
        return `<div class="modalChat">
                    <div class="modalChat__container">
                        <h4 class="modalChat__container">{{title}}</h4>
                        {{> Input 
                                inputId=infoInput.inputId
                                classInput=infoInput.classInput
                                typeInput=infoInput.typeInput
                                placeholderInput=infoInput.placeholderInput
                        }}
                        {{> Button 
                                idButton=infoButton.idButton
                                typeButton=infoButton.typeButton
                                classButton=infoButton.classButton
                                textButton=infoButton.textButton
                        }}
                    </div>
                </div>
                `
    }
}


