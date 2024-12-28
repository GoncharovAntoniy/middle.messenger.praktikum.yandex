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

const chatLogMessages: TChatLogMessages[] = [
  {
    id: 1,
    message: 'bla bla bla',
    role: 0,
    time: '12:00',
    isImage: false,
  },
  {
    id: 2,
    message: 'bla bla bla',
    role: 1,
    time: '12:00',
    isImage: false,
  },
  {
    id: 3,
    message: 'bla bla bla',
    role: 0,
    time: '12:00',
    isImage: false,
  },
  {
    id: 4,
    message: 'bla bla bla dddddddddd cbhdjhbc sdjhcbjsd chdhbsjdhc sdhbchjbds cjshdcbhbjdhc sdhbcjhbsdjhc dhbcjh sdc hbsjdhc',
    role: 1,
    time: '12:00',
    isImage: false,
  },
  {
    id: 5,
    message: 'bla bla bla hdcbjhsbd shcbjhdscb cshsjhcbs jchbsdjh chsdhcbjhdsc ',
    role: 0,
    time: '12:00',
    isImage: false,
  },
  {
    id: 6,
    message: 'bla bla bla dddddddddd cbhdjhbc sdjhcbjsd chdhbsjdhc sdhbchjbds cjshdcbhbjdhc sdhbcjhbsdjhc dhbcjh sdc hbsjdhc',
    role: 1,
    time: '12:00',
    isImage: false,
  },
  {
    id: 7,
    message: 'bla bla bla dddddddddd cbhdjhbc sdjhcbjsd chdhbsjdhc sdhbchjbds cjshdcbhbjdhc sdhbcjhbsdjhc dhbcjh sdc hbsjdhc',
    role: 0,
    time: '12:00',
    isImage: false,
  },
  {
    id: 8,
    message: 'bla bla bla dddddddddd cbhdjhbc sdjhcbjsd chdhbsjdhc sdhbchjbds cjshdcbhbjdhc sdhbcjhbsdjhc dhbcjh sdc hbsjdhc',
    role: 1,
    time: '12:00',
    isImage: false,
  },
  {
    id: 3,
    message: 'bla bla bla',
    role: 0,
    time: '12:00',
    isImage: false,
  },
  {
    id: 4,
    message: 'bla bla bla dddddddddd cbhdjhbc sdjhcbjsd chdhbsjdhc sdhbchjbds cjshdcbhbjdhc sdhbcjhbsdjhc dhbcjh sdc hbsjdhc',
    role: 1,
    time: '12:00',
    isImage: false,
  },
  {
    id: 5,
    message: 'bla bla bla hdcbjhsbd shcbjhdscb cshsjhcbs jchbsdjh chsdhcbjhdsc ',
    role: 0,
    time: '12:00',
    isImage: false,
  },
  {
    id: 6,
    message: 'bla bla bla dddddddddd cbhdjhbc sdjhcbjsd chdhbsjdhc sdhbchjbds cjshdcbhbjdhc sdhbcjhbsdjhc dhbcjh sdc hbsjdhc',
    role: 1,
    time: '12:00',
    isImage: false,
  },
  {
    id: 7,
    message: 'bla bla bla dddddddddd cbhdjhbc sdjhcbjsd chdhbsjdhc sdhbchjbds cjshdcbhbjdhc sdhbcjhbsdjhc dhbcjh sdc hbsjdhc',
    role: 0,
    time: '12:00',
    isImage: false,
  },
  {
    id: 8,
    message: 'bla bla bla dddddddddd cbhdjhbc sdjhcbjsd chdhbsjdhc sdhbchjbds cjshdcbhbjdhc sdhbcjhbsdjhc dhbcjh sdc hbsjdhc',
    role: 1,
    time: '12:00',
    isImage: false,
  },
];

const modalInfo: TModalInfo = {
  title: 'Добавьте пользователя',
  className: 'modalChat',
  closeIcon: '/images/XIcon.svg',
  infoInput: {
    name: 'login',
    inputId: 'inputLoginAddUser',
    classInput: 'input',
    typeInput: 'text',
    placeholderInput: 'Логин',
  },
  infoButton: {
    idButton: 'buttonAddUser',
    typeButton: 'button',
    classButton: 'buttonAuth',
    textButton: 'Добавить',
  },
};

const fields: TField[] = [
  {
    name: 'email',
    idInput: 'emailProfile',
    nameField: 'Почта',
    value: 'pochta@yandex.ru',
    typeInput: 'text',
    disabled: true,
  },
  {
    name: 'login',
    idInput: 'loginProfile',
    nameField: 'Логин',
    value: 'ivanivanov',
    typeInput: 'text',
    disabled: true,
  },
  {
    name: 'first_name',
    idInput: 'usernameProfile',
    nameField: 'Имя',
    value: 'Иван',
    typeInput: 'text',
    disabled: true,
  },
  {
    name: 'second_name',
    idInput: 'lastnameProfile',
    nameField: 'Фамилия',
    value: 'Иванов',
    typeInput: 'text',
    disabled: true,
  },
  {
    name: 'display_name',
    idInput: 'chatName',
    nameField: 'Имя в чате',
    value: 'Иван',
    typeInput: 'text',
    disabled: true,
  },
  {
    name: 'phone',
    idInput: 'numberProfile',
    nameField: 'Телефон',
    value: '+7 (909) 967 30 30',
    typeInput: 'text',
    disabled: true,
  },
];

const fieldsPass: TField[] = [
  {
    name: 'oldPassword',
    idInput: 'oldPass',
    nameField: 'Старый пароль',
    value: 'old password',
    typeInput: 'password',
  },
  {
    name: 'newPassword',
    idInput: 'newPass',
    nameField: 'Новый пароль',
    value: 'new password',
    typeInput: 'password',
  },
  {
    name: 'newPassword',
    idInput: 'newRePass',
    nameField: 'Повторите новый пароль',
    value: 'new password',
    typeInput: 'password',
  },
];

const contextLogin: TContextLogin = {
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
  infoAvatar: [
    {
      username: 'Антоний',
      lastMessage: 'Привет',
      time: '12:12',
      notReadMessageCount: '',
    },
    {
      username: 'Ксюша',
      lastMessage: 'Я люблю потусить',
      time: '19:20',
      notReadMessageCount: '4',
    },
    {
      username: 'Тихон',
      lastMessage: 'тестим аватар',
      time: '19:20',
      notReadMessageCount: '3',
    },
    {
      username: 'Саша',
      lastMessage: 'тестим аватар',
      time: '19:20',
      notReadMessageCount: '3',
    },
    {
      username: 'Владимир',
      lastMessage: 'тестим аватар',
      time: '',
      notReadMessageCount: '',
    },
    {
      username: 'Владимир',
      lastMessage: 'тестим аватар',
      time: '19:20',
      notReadMessageCount: '3',
    },
    {
      username: 'Владимир',
      lastMessage: 'тестим аватар',
      time: '19:20',
      notReadMessageCount: '3',
    },
    {
      username: 'Владимир',
      lastMessage: 'тестим аватар',
      time: '19:20',
      notReadMessageCount: '3',
    },
  ],
  infoHeaderChat: {
    username: 'username',
  },
  infoSubmitInput: {
    name: 'message',
    id: 'submitInput',
    type: 'text',
    classInput: 'submitFormMessage__input',
  },
  modalInfo,
  submitActionsItem,
};

const contextProfile: TContextProfile = {
  updateData: false,
  updatePass: false,
  saveButton: false,
  modalPropfile: false,
  avatarInfo: {
    avatar: '/images/userIcon.svg',
    username: 'Антоний',
    classAvatar: 'profile__infoUser_avatar-container_icon',
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
  currentPage: '/register',
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
