import { BlockProps } from '../framework/Block';
import { Input } from '../components/input';
import { Button } from '../components/button';

export interface TChatLogMessages extends BlockProps {
  id: number;
  message: string;
  role: number;
  time: string;
  isImage: boolean;
}

export interface TInput extends BlockProps {
  name?: string;
  inputId: string;
  classInput: string;
  typeInput: string;
  placeholderInput: string;
  value?: string;
  onChange?: (e: Event, currentThis: Input) => void;
  onBlur?: (e: Event, currentThis: Input) => void;
  events?: Record<string, (e: Event, currentThis: Input) => void>;
}

export interface TButton extends BlockProps {
  idButton: string;
  typeButton?: string;
  classButton?: string;
  textButton?: string;
  events?: Record<string, (e: Event) => void>;
  onClick?: (e: Event, currentThis: Button) => void;
}

export interface TField extends BlockProps {
  name: string;
  idInput: string;
  nameField: string;
  value: string;
  typeInput: string;
  disabled?: boolean;
  onChange?: (e: Event, currentThis: Input) => void;
  onBlur?: (e: Event, currentThis: Input) => void;
}

export interface TContextLogin extends BlockProps {
  inputs: TInput[];
  buttons: TButton[];
}

export interface TContextRegister extends BlockProps {
  inputs: TInput[];
  buttons: TButton[];
}

export interface TSubmitActionItem extends BlockProps {
  icon: string;
  actionId: string;
  actionType: string;
  textItem: string;
  class: string;
  accept: string;
}

export interface TInfoAvatar extends BlockProps {
  title: string;
  avatar?: string;
  created_by?: string;
  id: number;
  last_message?: Record<string, any>;
  unread_count?: string;
  time: string;
  currentChatClass?: string;
}

export interface TInfoHeaderChat extends BlockProps {
  title: string;
}

export interface TInfoSubmitInput extends BlockProps {
  name: string;
  id: string;
  type: string;
  classInput: string;
}

export interface TModalInfo extends BlockProps {
  title: string;
  className: string;
  infoInput: TInput;
  infoButton: TButton;
}
export interface TModalInfoDeleteUsers extends BlockProps {
  title: string;
  className: string;
  chatId: number;
  infoButton: TButton;
}

export interface TContextChat extends BlockProps {
  infoAvatar: TInfoAvatar[];
  infoHeaderChat: TInfoHeaderChat;
  infoSubmitInput: TInfoSubmitInput;
  modalInfo: TModalInfo;
  deleteUsersModalInfo: TModalInfoDeleteUsers;
  submitActionsItem: TSubmitActionItem[];
}

export interface TAvatarInfoProfile extends BlockProps {
  avatar: string;
  username: string;
  classAvatar: string;
  onClick: () => void | null;
}

export interface TContextProfile extends BlockProps {
  updateData: boolean;
  updatePass: boolean;
  saveButton: boolean;
  modalProfile: boolean;
  avatarInfo: TAvatarInfoProfile;
  buttons: TButton[];
  updateBtn: TButton;
}

export interface TModalProfileInfo extends BlockProps {
  title: string;
  infoInput: TInput;
  infoButton: TButton;
}

export interface TErrorPageContext extends BlockProps {
  errorCode: string;
  errorDescription: string;
  backToChatBtn: TButton;
}

export interface TDict {
  [key: string]: string | number;
}

export interface IUser {
  avatar: string;
  display_name: string;
  first_name: string;
  id: number;
  login: string;
  second_name: string;
}

export interface TState extends BlockProps {
  currentPage: string;
  emptyLog: boolean;
  chatLogMessages: TChatLogMessages[];
  modalInfo: TModalInfo;
  fields: TField[];
  fieldsPass: TField[];
  contextLogin: TContextLogin;
  contextRegister: TContextRegister;
  contextChat: TContextChat;
  contextProfile: TContextProfile;
  modalProfileInfo: TModalProfileInfo;
  errorPageContext: TErrorPageContext;
}
