import { router } from '../../App';
import { Button } from '../../components/button';
import Block from '../../framework/Block';
import store, { StoreEvents } from '../../store/store';
import { TButton, TContextProfile, TField, TModalProfileInfo } from '../../types/index';
import { changeClickButtonProfile } from '../../utils/changeClickButtonProfile';
import { changeInputsProfile } from '../../utils/changeInputsProfile';
import { isEqualAuthor } from '../../utils/isEqualUtil';
import { validationFormInput } from '../../utils/validationFormInput';
import { avatarProfile } from './components/avatarProfile';
import { BackToChat } from './components/backToChat';
import { FieldInfoProfile } from './components/fieldInfoProfile';
import { ModalProfile } from './components/ModalProfile';

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
      saveButton: props.props?.contextProfile.saveButton,
      BackToChat: new BackToChat({
        idButton: 'backToChatBtnProfile',
        onClick: (e: Event) => {
          this.backToChatRedirect(e);
        },
      }),
      AvatarProfile: new avatarProfile({
        avatar: JSON.parse(String(localStorage.getItem('userInfo'))).avatar ? JSON.parse(String(localStorage.getItem('userInfo'))).avatar : '',
        classAvatar: props.props.contextProfile.avatarInfo.classAvatar,
        username: props.props.contextProfile.avatarInfo.username,
        onClick: () => {
          store.set('contextProfile.modalProfile', true);
        },
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
                onChange: (e: Event, currentThis) => changeInputsProfile(e, currentThis),
                onBlur: (e: Event, currentThis) => validationFormInput(e, currentThis),
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
    store.on(StoreEvents.Updated, () => console.log('update'));
  }

  backToChatRedirect(e: Event) {
    e.preventDefault();
    router.go('/chat');
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    const userInfo: any = store.getState().contextProfile.userInfo;
    if (oldProps.props || newProps.props) {
      if (!isEqualAuthor(oldProps.props?.contextProfile.userInfo, newProps.props?.contextProfile.userInfo)) {
        this.setLists({
          FieldsInfoProfile: newProps.props?.fields.map((item: TField) => {
            console.log('userInfo', userInfo[item.name]);
            return new FieldInfoProfile({
              idInput: item.idInput,
              name: item.name,
              nameField: item.nameField,
              typeInput: item.typeInput,
              value: userInfo[item.name],
              disabled: item.disabled,
              onChange: (e: Event, currentThis) => changeInputsProfile(e, currentThis),
              onBlur: (e: Event, currentThis) => validationFormInput(e, currentThis),
            });
          }),
        });
        this.setProps({ ...newProps.props });
      }
      if (newProps.props?.contextProfile.modalProfile) {
        this.setChild({ ModalProfile: new ModalProfile({ props: newProps.props.modalProfileInfo }) });
      } else if (!newProps.props?.contextProfile.modalProfile) {
        this.removeChildren('ModalProfile');
      }
    }
    return true;
  }

  render() {
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
                      {{#if saveButton }}
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
