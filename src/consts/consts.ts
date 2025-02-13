import {
  TChatLogMessages,
  TContextChat,
  TContextLogin,
  TContextProfile,
  TContextRegister,
  TDict,
  TErrorPageContext,
  TField,
  TModalInfo,
  TModalProfileInfo,
  TState,
  TSubmitActionItem,
} from '../types';

const chatLogMessages: TChatLogMessages[] = [];

const modalInfo: TModalInfo = {
  title: 'Добавьте пользователя',
  className: 'modalChat',
  infoInput: {
    name: 'login',
    inputId: 'inputLoginAddUser',
    classInput: 'input',
    typeInput: 'text',
    placeholderInput: 'Логин',
  },
  infoButton: {
    idButton: 'buttonAddUser',
    typeButton: 'submit',
    classButton: 'buttonAuth',
    textButton: 'Добавить',
  },
};
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
const email = userInfo.email || '';
const login = userInfo.login || '';
const first_name = userInfo.first_name || '';
const second_name = userInfo.second_name || '';
const display_name = userInfo.display_name || '';
const phone = userInfo.phone || '';

const fields: TField[] = [
  {
    name: 'email',
    idInput: 'emailProfile',
    nameField: 'Почта',
    value: email,
    typeInput: 'text',
    disabled: true,
  },
  {
    name: 'login',
    idInput: 'loginProfile',
    nameField: 'Логин',
    value: login,
    typeInput: 'text',
    disabled: true,
  },
  {
    name: 'first_name',
    idInput: 'usernameProfile',
    nameField: 'Имя',
    value: first_name,
    typeInput: 'text',
    disabled: true,
  },
  {
    name: 'second_name',
    idInput: 'lastnameProfile',
    nameField: 'Фамилия',
    value: second_name,
    typeInput: 'text',
    disabled: true,
  },
  {
    name: 'display_name',
    idInput: 'chatName',
    nameField: 'Имя в чате',
    value: display_name,
    typeInput: 'text',
    disabled: true,
  },
  {
    name: 'phone',
    idInput: 'numberProfile',
    nameField: 'Телефон',
    value: phone,
    typeInput: 'text',
    disabled: true,
  },
];

const fieldsPass: TField[] = [
  {
    name: 'oldPassword',
    idInput: 'oldPass',
    nameField: 'Старый пароль',
    value: '',
    typeInput: 'password',
  },
  {
    name: 'newPassword',
    idInput: 'newPass',
    nameField: 'Новый пароль',
    value: '',
    typeInput: 'password',
  },
  {
    name: 'newPassword',
    idInput: 'newRePass',
    nameField: 'Повторите новый пароль',
    value: '',
    typeInput: 'password',
  },
];

const contextLogin: TContextLogin = {
  title: 'Вход',
  inputs: [
    {
      name: 'login',
      inputId: 'inputText',
      classInput: 'input',
      typeInput: 'text',
      placeholderInput: 'Логин',
    },
    {
      name: 'password',
      inputId: 'inputPassword',
      classInput: 'input',
      typeInput: 'password',
      placeholderInput: 'Пароль',
    },
  ],
  buttons: [
    {
      idButton: 'authBtn',
      typeButton: 'submit',
      classButton: 'buttonAuth',
      textButton: 'Авторизоваться',
    },
    {
      idButton: 'linkBtn',
      typeButton: 'button',
      classButton: 'buttonLink',
      textButton: 'Нет аккаунта?',
    },
  ],
};

const contextRegister: TContextRegister = {
  inputs: [
    {
      name: 'email',
      inputId: 'email',
      classInput: 'input',
      typeInput: 'text',
      placeholderInput: 'Почта',
    },
    {
      name: 'login',
      inputId: 'login',
      classInput: 'input',
      typeInput: 'text',
      placeholderInput: 'Логин',
    },
    {
      name: 'first_name',
      inputId: 'firstname',
      classInput: 'input',
      typeInput: 'text',
      placeholderInput: 'имя',
    },
    {
      name: 'second_name',
      inputId: 'lastname',
      classInput: 'input',
      typeInput: 'text',
      placeholderInput: 'Фамилия',
    },
    {
      name: 'phone',
      inputId: 'telephone',
      classInput: 'input',
      typeInput: 'number',
      placeholderInput: 'Телефон',
    },
    {
      name: 'password',
      inputId: 'inputPassword',
      classInput: 'input',
      typeInput: 'password',
      placeholderInput: 'Пароль',
    },
    {
      name: 'password',
      inputId: 'repassword',
      classInput: 'input',
      typeInput: 'password',
      placeholderInput: 'Пароль (ещё раз)',
    },
  ],
  buttons: [
    {
      idButton: 'registerBtn',
      typeButton: 'button',
      classButton: 'buttonAuth',
      textButton: 'Зарегистрироваться',
    },
    {
      idButton: 'loginBtn',
      typeButton: 'button',
      classButton: 'buttonLink',
      textButton: 'Войти',
    },
  ],
};

const submitActionsItem: TSubmitActionItem[] = [
  {
    icon: '/images/fotoAction.svg',
    actionId: 'input_media',
    actionType: 'file',
    textItem: 'Фото или Видео',
    class: 'media',
    accept: 'image/*,video/*',
  },
  {
    icon: '/images/fileAction.svg',
    actionId: 'input_file',
    actionType: 'file',
    textItem: 'Файл',
    class: 'file',
    accept: '',
  },
  {
    icon: '/images/locationAction.svg',
    actionId: 'input_location',
    actionType: 'file',
    textItem: 'Локация',
    class: 'location',
    accept: '',
  },
];

const contextChat: TContextChat = {
  infoAvatar: [],
  infoHeaderChat: {
    title: '',
  },
  infoSubmitInput: {
    name: 'message',
    id: 'submitInput',
    type: 'text',
    classInput: 'submitFormMessage__input',
  },
  modalInfo,
  submitActionsItem,
  createChat: {
    valueInput: '',
  },
};

const contextProfile: TContextProfile = {
  updateData: false,
  updatePass: false,
  saveButton: false,
  modalProfile: false,
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
  avatarInfo: {
    avatar: '/images/userIcon.svg',
    username: 'Антоний',
    classAvatar: 'profile__infoUser_avatar-container_icon',
    onClick: () => null,
  },

  buttons: [
    {
      idButton: 'updateData',
      typeButton: 'button',
      classButton: 'buttonLink',
      textButton: 'Изменить данные',
    },
    {
      idButton: 'updatePassword',
      typeButton: 'button',
      classButton: 'buttonLink',
      textButton: 'Изменить пароль',
    },
    {
      idButton: 'logout',
      typeButton: 'button',
      classButton: 'buttonLink colorRed',
      textButton: 'Выйти',
    },
  ],
  updateBtn: {
    idButton: 'saveDataBtn',
    typeButton: 'button',
    classButton: 'buttonAuth buttonProfileSave',
    textButton: 'Сохранить',
  },
};

const modalProfileInfo: TModalProfileInfo = {
  title: 'Загрузите файл',
  infoInput: {
    inputId: 'addFoto',
    classInput: 'addFotoInput',
    typeInput: 'file',
    value: '',
    placeholderInput: 'Выбрать файл на компьютере',
  },
  infoButton: {
    idButton: 'buttonUpdateFoto',
    typeButton: 'button',
    classButton: 'buttonAuth',
    textButton: 'Поменять',
  },
};

const errorPageContext: TErrorPageContext = {
  errorCode: '404',
  errorDescription: 'Не туда попали',
  backToChatBtn: {
    idButton: 'backToChat',
    typeButton: 'button',
    classButton: 'buttonLink backToChat',
    textButton: 'Назад к чатам',
  },
};

export const dictInput: TDict = {};
export const dictInputProfile: TDict = {};

export const state: TState = {
  currentPage: '/',
  chatLogMessages,
  emptyLog: false,
  modalInfo,
  modalProfileInfo,
  fields,
  fieldsPass,
  contextLogin,
  contextRegister,
  contextChat,
  contextProfile,
  errorPageContext,
};
