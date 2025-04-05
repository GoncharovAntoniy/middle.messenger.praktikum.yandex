import { dictInput } from '../consts/consts';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkRegex = (regex: RegExp, currentThis: any, value: string, errorValue: string) => {
  !regex.test(value) && value ? currentThis.setProps({ classInput: 'input errorInput', errorValue: errorValue }) : currentThis.setProps({ classInput: 'input', errorValue: '' });
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validationFormInput = (event: Event, currentThis: any) => {
  event.preventDefault();
  const { name, value } = event.target as HTMLInputElement;
  console.log(currentThis);
  dictInput[name] = value;
  let regex = null;
  switch (name) {
    case 'login':
      regex = /^[a-z0-9_-]{3,16}$/;
      checkRegex(regex, currentThis, value, 'Логин должен иметь не менее 3 символов и не более 16');
      break;
    case 'password':
      regex = /^(?=.*[A-Za-z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,40}$/;
      checkRegex(regex, currentThis, value, 'Пароль начинается с заглавной буквы, не менее 8 символов, обязательно наличие цирфы и спецсимвол');
      break;
    case 'email':
      regex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
      checkRegex(
        regex,
        currentThis,
        value,
        'Латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
      );
      break;
    case 'first_name':
      regex = /^[A-ZА-ЯЁ][a-zа-яё_]+$/;
      checkRegex(regex, currentThis, value, 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис');
      break;
    case 'second_name':
      regex = /^[A-ZА-ЯЁ][a-zа-яё_]+$/;
      checkRegex(regex, currentThis, value, 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис');
      break;
    case 'phone':
      regex = /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
      checkRegex(regex, currentThis, value, 'от 10 до 15 символов, состоит из цифр, может начинается с плюса');
      break;
    case 'message':
      value.length === 0 ? currentThis.setProps({ classInput: 'submitFormMessage__input errorInput' }) : currentThis.setProps({ classInput: 'submitFormMessage__input' });
      break;

    default:
      return;
  }
};
