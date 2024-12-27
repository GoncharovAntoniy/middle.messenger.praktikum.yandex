import { FieldInfoProfile } from '../pages/profile/components/fieldInfoProfile';
import { TField } from '../types';
import { changeInputsProfile } from './changeInputsProfile';
import { validationFormInput } from './validationFormInput';

export const updateBoolSaveBtnAndPass = (currentThis: any, value: boolean) => {
  currentThis.setProps({
    ...currentThis.props,
    props: {
      ...currentThis.props.props,
      contextProfile: {
        ...currentThis.props.props.contextProfile,
        saveButton: value,
        updatePass: value,
      },
    },
  });

  const FieldsInfoProfile = value
    ? currentThis.props.props.fieldsPass.map(
        (item: TField) =>
          new FieldInfoProfile({
            idInput: item.idInput,
            name: item.name,
            nameField: item.nameField,
            typeInput: item.typeInput,
            value: item.value,
            onChange: (e, thisCur) => changeInputsProfile(e, thisCur),
            onBlur: (e, thisCur) => validationFormInput(e, thisCur),
          }),
      )
    : currentThis.props.props.fields.map(
        (item: TField) =>
          new FieldInfoProfile({
            idInput: item.idInput,
            name: item.name,
            nameField: item.nameField,
            typeInput: item.typeInput,
            value: item.value,
            disabled: item.disabled,
            onChange: (e, thisCur) => changeInputsProfile(e, thisCur),
            onBlur: (e, thisCur) => validationFormInput(e, thisCur),
          }),
      );
  currentThis.setLists({ FieldsInfoProfile });
};
