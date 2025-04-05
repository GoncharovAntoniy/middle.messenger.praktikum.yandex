import { LogoutApi } from '../api/logout-api';
import { UserApi } from '../api/user-api';
import App from '../App';
import { Button } from '../components/button';
import { dictInputProfile } from '../consts/consts';
import Block from '../framework/Block';
import { TButton } from '../types/index';
import { updateBoolSaveBtn } from './updateBoolSaveBtn';
import { updateBoolSaveBtnAndPass } from './updateBoolSaveBtnAndPass';

const userApi = new UserApi();
export const changeClickButtonProfile = async (event: Event, currentThis: Block) => {
  const currentFieldsEl = currentThis.lists.FieldsInfoProfile;
  const currentElementId = (event.currentTarget as HTMLInputElement).id;

  const updateButtons = () => {
    currentThis.children.Buttons = new Button({
      classButton: currentThis.props.props?.contextProfile.updateBtn.classButton,
      idButton: currentThis.props.props?.contextProfile.updateBtn.idButton,
      textButton: currentThis.props.props?.contextProfile.updateBtn.textButton,
      typeButton: currentThis.props.props?.contextProfile.updateBtn.typeButton,
      onClick: (e) => changeClickButtonProfile(e, currentThis),
    });
    currentThis.removeLists('Buttons');
    updateBoolSaveBtn(currentThis, true);
  };

  const Buttons = currentThis.props.props?.contextProfile.buttons.map(
    (item: TButton) =>
      new Button({
        classButton: item.classButton,
        idButton: item.idButton,
        textButton: item.textButton,
        typeButton: item.typeButton,
        onClick: (e: Event) => changeClickButtonProfile(e, currentThis),
      }),
  );

  switch (currentElementId) {
    case 'updateData': {
      updateButtons();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      currentFieldsEl.forEach((item: any) => {
        item.setProps({ ...item.props, disabled: false });
      });
      return;
    }
    case 'updatePassword': {
      updateBoolSaveBtnAndPass(currentThis, true);
      updateButtons();
      console.log(currentThis);
      return;
    }
    case 'logout': {
      const logout = new LogoutApi();
      logout.logout();
      return 'click logout';
    }
    case 'saveDataBtn': {
      const app = new App();
      console.log('currentThis', currentThis.lists.FieldsInfoProfile.length);
      if (currentThis.lists.FieldsInfoProfile.length <= 3) {
        await userApi.updateUserPassword(dictInputProfile);
        app.render();
      } else {
        await userApi.updateUserInfo(dictInputProfile);
        app.render();
      }
      currentThis.removeChildren('Buttons');
      currentThis.setLists({ Buttons });
      updateBoolSaveBtnAndPass(currentThis, false);
      updateBoolSaveBtn(currentThis, false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      currentFieldsEl.forEach((item: any) => {
        item.setProps({ ...item.props, disabled: true });
      });
      return;
    }

    default:
      return;
  }
};
