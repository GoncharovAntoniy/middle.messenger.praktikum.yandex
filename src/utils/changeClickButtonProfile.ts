import App from "../App.ts"
import { Button } from "../components/button"
import { state } from "../consts/consts"
import { TButton } from "../types/index.ts"
import { updateBoolSaveBtn } from "./updateBoolSaveBtn"
import { updateBoolSaveBtnAndPass } from "./updateBoolSaveBtnAndPass"



export const changeClickButtonProfile = (event: Event, currentThis: any) => {
    const currentFieldsEl = currentThis.lists.FieldsInfoProfile
    const currentElementId = (event.currentTarget as HTMLInputElement).id

    const updateButtons = () => {
        currentThis.children.Buttons = new Button({
            classButton: currentThis.props.props.contextProfile.updateBtn.classButton,
            idButton: currentThis.props.props.contextProfile.updateBtn.idButton,
            textButton: currentThis.props.props.contextProfile.updateBtn.textButton,
            typeButton: currentThis.props.props.contextProfile.updateBtn.typeButton,
            onClick: (e) => changeClickButtonProfile(e, currentThis)
        })
        currentThis.removeLists('Buttons')
        updateBoolSaveBtn(currentThis, true)
    }

    const Buttons = currentThis.props.props.contextProfile.buttons.map((item: TButton) => new Button({
        classButton: item.classButton,
        idButton: item.idButton,
        textButton: item.textButton,
        typeButton: item.typeButton,
        onClick: (e: Event) => changeClickButtonProfile(e, currentThis)

    }))

    switch (currentElementId) {
        case 'updateData': {
            updateButtons()
            currentFieldsEl.forEach((item: any) => {
                item.setProps({ ...item.props, disabled: false })
            })
            return
        }
        case 'updatePassword': {
            updateBoolSaveBtnAndPass(currentThis, true)
            updateButtons()
            console.log(currentThis)
            return
        }
        case 'logout': {
            state.currentPage = '/login'
            const app = new App()
            app.render()
            return 'click logout'
        }
        case 'saveDataBtn': {
            currentThis.removeChildren("Buttons")
            currentThis.setLists({ Buttons })
            updateBoolSaveBtnAndPass(currentThis, false)
            updateBoolSaveBtn(currentThis, false)
            currentFieldsEl.forEach((item: any) => {
                item.setProps({ ...item.props, disabled: true })
            })
            const app = new App()
            app.render()
            return
        }


        default:
            return
    }
}
