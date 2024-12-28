import { dictInput } from '../consts/consts';

interface BlockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const checkRegex = (regex: RegExp, currentThis: BlockProps, value: string) => {
  !regex.test(value) && value ? currentThis.setProps({ classInput: 'input errorInput' }) : currentThis.setProps({ classInput: 'input' });
};

export const validationFormInput = (event: Event, currentThis: BlockProps) => {
  const { name, value } = event.target as HTMLInputElement;
  console.log(currentThis);
  dictInput[name] = value;
  let regex = null;
  switch (name) {
    case 'login':
      regex = /^[a-z0-9_-]{3,16}$/;
      checkRegex(regex, currentThis, value);
      break;
    case 'password':
      regex = /^(?=.*[A-Za-z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,40}$/;
      checkRegex(regex, currentThis, value);
      break;
    case 'email':
      regex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
      checkRegex(regex, currentThis, value);
      break;
    case 'first_name':
      regex = /^[A-ZА-ЯЁ][a-zа-яё_]+$/;
      checkRegex(regex, currentThis, value);
      break;
    case 'second_name':
      regex = /^[A-ZА-ЯЁ][a-zа-яё_]+$/;
      checkRegex(regex, currentThis, value);
      break;
    case 'phone':
      regex = /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
      checkRegex(regex, currentThis, value);
      break;
    case 'message':
      value.length === 0 ? currentThis.setProps({ classInput: 'submitFormMessage__input errorInput' }) : currentThis.setProps({ classInput: 'submitFormMessage__input' });
      break;

    default:
      return;
  }
};
