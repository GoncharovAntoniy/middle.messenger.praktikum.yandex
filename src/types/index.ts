export interface TChatLogMessages {
    id: number;
    message: string;
    role: number;
    time: string;
    isImage: boolean;
}

export interface TInput {
    name?: string;
    inputId: string;
    classInput: string;
    typeInput: string;
    placeholderInput: string;
    value?: string;
    onChange?: (e: Event, currentThis: any) => void,
    onBlur?: (e: Event, currentThis: any) => void,
    events?: { [key: string]: (e: Event, currentThis: any) => void };
}

export interface TButton {
    idButton: string;
    typeButton?: string;
    classButton?: string;
    textButton?: string;
    events?: Record<string, (e: Event) => void>;
    onClick?: (e: Event, currentThis: any) => void;
}


export interface TField {
    name: string;
    idInput: string;
    nameField: string;
    value: string;
    typeInput: string;
    disabled?: boolean;
    onChange?: (e: Event, currentThis: any) => void;
    onBlur?: (e: Event, currentThis: any) => void;
}

export interface TContextLogin {
    inputs: TInput[];
    buttons: TButton[];
}

export interface TContextRegister {
    inputs: TInput[];
    buttons: TButton[];
}

export interface TSubmitActionItem {
    icon: string;
    actionId: string;
    actionType: string;
    textItem: string;
    class: string;
    accept: string
}

export interface TInfoAvatar {
    username: string;
    lastMessage?: string;
    time?: string;
    notReadMessageCount?: string;
}

export interface TInfoHeaderChat {
    username: string;
}

export interface TInfoSubmitInput {
    name: string;
    id: string;
    type: string;
    classInput: string
}

export interface TModalInfo {
    title: string;
    className: string;
    closeIcon: string;
    infoInput: TInput;
    infoButton: TButton
}


export interface TContextChat {
    infoAvatar: TInfoAvatar[];
    infoHeaderChat: TInfoHeaderChat;
    infoSubmitInput: TInfoSubmitInput;
    modalInfo: TModalInfo;
    submitActionsItem: TSubmitActionItem[]
}

export interface TAvatarInfoProfile {
    avatar: string;
    username: string;
    classAvatar: string
}

export interface TContextProfile {
    updateData: boolean;
    updatePass: boolean;
    saveButton: boolean;
    modalPropfile: boolean;
    avatarInfo: TAvatarInfoProfile;
    buttons: TButton[];
    updateBtn: TButton;

}

export interface TModalProfileInfo {
    title: string;
    infoInput: TInput;
    infoButton: TButton;
}

export interface TErrorPageContext {
    errorCode: string;
    errorDescription: string;
    backToChatBtn: TButton
}

export interface TDict {
    [key: string]: string | number;
}

export interface TState {
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
    errorPageContext: TErrorPageContext
}