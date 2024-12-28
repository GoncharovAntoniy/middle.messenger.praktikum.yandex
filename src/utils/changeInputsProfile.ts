import { dictInputProfile, state } from '../consts/consts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const changeInputsProfile = (e: Event, currentThis: any) => {
  const { value, type, name } = e.target as HTMLInputElement;
  if (type === 'password') {
    state.fieldsPass = state.fieldsPass.map((item) => (item.idInput === currentThis.props.idInput ? { ...item, value } : item));
  } else {
    state.fields = state.fields.map((item) => (item.idInput === currentThis.props.idInput ? { ...item, value } : item));
  }
  currentThis.setProps({ value });
  dictInputProfile[name] = value;
  console.log(dictInputProfile);
};
