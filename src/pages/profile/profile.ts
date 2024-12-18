import App from "../../App.ts";
import { Button } from "../../components/button";
import { state } from "../../consts/consts";
import Block from "../../framework/Block";
import { changeClickButtonProfile } from "../../utils/changeClickButtonProfile";
import { AvatarProfile } from "./components/avatarProfile";
import { BackToChat } from "./components/backToChat";
import { FieldInfoProfile } from "./components/fieldInfoProfile";
import { ModalProfile } from "./components/modalUpdateIconProfile";

export class Profile extends Block {
    constructor(props) {
        super({
            ...props,
            BackToChat: new BackToChat({onClick: (e) => {
                this.backToChatRedirect(e)
            }}),
            AvatarProfile: new AvatarProfile({
                avatar: props.props.contextProfile.avatarInfo.avatar,
                classAvatar: props.props.contextProfile.avatarInfo.classAvatar,
                username: props.props.contextProfile.avatarInfo.username
            }),
            FieldsInfoProfile: props.props.contextProfile.updatePass
                ?
                props.props.fieldsPass.map((item) => (
                    new FieldInfoProfile({
                        id: item.id,
                        name: item.name,
                        nameField: item.nameField,
                        typeInput: item.typeInput,
                        value: item.value
                    })
                ))
                :
                props.props.fields.map((item) => (
                    new FieldInfoProfile({
                        id: item.id,
                        name: item.name,
                        nameField: item.nameField,
                        typeInput: item.typeInput,
                        value: item.value,
                        disabled: item.disabled
                    })
                )),
            Buttons: props.props.contextProfile.buttons.map((item) => new Button({
                    classButton: item.classButton,
                    idButton: item.idButton,
                    textButton: item.textButton,
                    typeButton: item.typeButton,
                    // onClick: (e) => this.children.BackToChat.setProps({backText: "new Test"})
                    onClick: (e) => changeClickButtonProfile(e, this)

                })),
            ModalProfile: props.props.contextProfile.modalPropfile ? new ModalProfile({ props: props.props.modalProfileInfo }) : null
        })
    }

    backToChatRedirect(e) {
        e.preventDefault()
        state.currentPage = '/chat'
        const app = new App()
        app.render()
    }
    render() {
        const saveButton = this.props.props.contextProfile.saveButton
        return `
        <div id="app">
            <main class="profile">
                        <div class="profile__backToChat">
                            {{{ BackToChat }}}
                        </div>
                        <section class="profile__infoUser">
                            <div class="profile__infoUser_container">
                                {{{ AvatarProfile }}}
                                <div class="profile__infoUser_container_fields">
                                {{{ FieldsInfoProfile }}}
                                
                                </div>
                                <div class="profile__infoUser_container_update">
                                {{#if ${saveButton}}}
                                <div class="profile__infoUser_container_update-saveBtnContainer">
                                    {{{ Buttons }}}
                                </div>
                                {{else}}
                                    <div class="profile__infoUser_container_update-btnContainer">
                                        {{{ Buttons }}}
                                    </div>
                                {{/if}}
                                </div>
                            </div>
                        </section>
                        </main>
                        {{{ ModalProfile }}}
                    <div/>
                    `
    }
}


