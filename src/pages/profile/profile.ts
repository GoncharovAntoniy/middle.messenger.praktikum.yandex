import App from '../../App';
import { Button } from '../../components/button';
import { state } from '../../consts/consts';
import Block from '../../framework/Block';
import { TButton, TContextProfile, TField, TModalProfileInfo } from '../../types/index';
import { changeClickButtonProfile } from '../../utils/changeClickButtonProfile';
import { changeInputsProfile } from '../../utils/changeInputsProfile';
import { validationFormInput } from '../../utils/validationFormInput';
import { AvatarProfile } from './components/avatarProfile';
import { BackToChat } from './components/backToChat';
import { FieldInfoProfile } from './components/fieldInfoProfile';
import { ModalProfile } from './components/modalUpdateIconProfile';

interface TProps {
  props: {
    contextProfile: TContextProfile;
    fieldsPass: TField[];
    fields: TField[];
    modalProfileInfo: TModalProfileInfo;
  };
}

export class Profile extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      BackToChat: new BackToChat({
        idButton: 'backToChatBtnProfile',
        onClick: (e: Event) => {
          this.backToChatRedirect(e);
        },
      }),
      AvatarProfile: new AvatarProfile({
        avatar: props.props.contextProfile.avatarInfo.avatar,
        classAvatar: props.props.contextProfile.avatarInfo.classAvatar,
        username: props.props.contextProfile.avatarInfo.username,
      }),
      FieldsInfoProfile: props.props.contextProfile.updatePass
        ? props.props.fieldsPass.map(
            (item: TField) =>
              new FieldInfoProfile({
                idInput: item.idInput,
                name: item.name,
                nameField: item.nameField,
                typeInput: item.typeInput,
                value: item.value,
                onChange: (e: Event, currentThis: any) => changeInputsProfile(e, currentThis),
                onBlur: (e: Event, currentThis: any) => validationFormInput(e, currentThis),
              }),
          )
        : props.props.fields.map(
            (item: TField) =>
              new FieldInfoProfile({
                idInput: item.idInput,
                name: item.name,
                nameField: item.nameField,
                typeInput: item.typeInput,
                value: item.value,
                disabled: item.disabled,
                onChange: (e: Event, currentThis) => changeInputsProfile(e, currentThis),
                onBlur: (e: Event, currentThis) => validationFormInput(e, currentThis),
              }),
          ),
      Buttons: props.props.contextProfile.buttons.map(
        (item: TButton) =>
          new Button({
            classButton: item.classButton,
            idButton: item.idButton,
            textButton: item.textButton,
            typeButton: item.typeButton,
            onClick: (e) => changeClickButtonProfile(e, this),
          }),
      ),
      ModalProfile: props.props.contextProfile.modalPropfile ? new ModalProfile({ props: props.props.modalProfileInfo }) : null,
    });
  }

  backToChatRedirect(e: Event) {
    e.preventDefault();
    state.currentPage = '/chat';
    const app = new App();
    app.render();
  }

  render() {
    const saveButton = this.props.props.contextProfile.saveButton;
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
                    `;
  }
}
