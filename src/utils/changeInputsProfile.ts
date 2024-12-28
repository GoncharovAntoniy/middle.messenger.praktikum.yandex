import { Input } from '../components/input';
import { dictInputProfile, state } from '../consts/consts';

export const changeInputsProfile = (e: Event, currentThis: Input) => {
  const { value, type, name } = e.target as HTMLInputElement;
  if (type === 'password') {
    state.fieldsPass = state.fieldsPass.map((item) => (item.idInput === currentThis.props?.idInput ? { ...item, value } : item));
  } else {
    state.fields = state.fields.map((item) => (item.idInput === currentThis.props?.idInput ? { ...item, value } : item));
  }
  currentThis.setProps ? currentThis?.setProps({ value }) : null;
  dictInputProfile[name] = value;
  console.log(dictInputProfile);
};
