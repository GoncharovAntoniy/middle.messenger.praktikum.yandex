import Handlebars from 'handlebars';
import * as Pages from './pages/index';
import * as Components from './components/index'
import * as ChatComponents from './pages/chat/components'
import * as Modules from './pages/chat/modules'
import * as ProfileComponents from './pages/profile/components/index'

Handlebars.registerPartial('Input', Components.Input)
Handlebars.registerPartial('Button', Components.Button)
Handlebars.registerPartial('EmptyChatLog', ChatComponents.EmptyChatLog)
Handlebars.registerPartial('Avatar', ChatComponents.Avatar)
Handlebars.registerPartial('HeaderSearch', ChatComponents.HeaderSearch)
Handlebars.registerPartial('HeaderChat', ChatComponents.HeaderChat)
Handlebars.registerPartial('SearchChatInput', ChatComponents.SearchChatInput)
Handlebars.registerPartial('SubmitInput', ChatComponents.SubmitInput)
Handlebars.registerPartial('ChatLog', ChatComponents.ChatLog)
Handlebars.registerPartial('ModalChat', ChatComponents.ModalChat)
Handlebars.registerPartial('SearchAndListUsersModule', Modules.SearchAndListUsersModule)
Handlebars.registerPartial('MessageModule', Modules.MessageModule)
Handlebars.registerPartial('BackToChat', ProfileComponents.BackToChat)
Handlebars.registerPartial('AvatarProfile', ProfileComponents.AvatarProfile)
Handlebars.registerPartial('FieldInfoProfile', ProfileComponents.FieldInfoProfile)


export default class App {
    constructor() {
        this.appElement = document.getElementById("app")
        this.chatModal = null
        this.modalChatContainer
        this.updateData = false
        this.updatePass = false
        this.saveButton = false
        this.state = {
            currentPage: '/login',
            chatLogMessages: [
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
            ],
            emptyLog: false,
            modalInfo: {
                title: 'Добавьте пользователя',
                infoInput: {
                    inputId: "inputLoginAddUser",
                    classInput: "input",
                    typeInput: "text",
                    placeholderInput: "Логин",
                },
                infoButton: {
                    idButton: "buttonAddUser",
                    typeButton: "button",
                    classButton: "buttonAuth",
                    textButton: "Добавить",
                }
            },

            fields: [
                {
                    id: 'emailProfile',
                    nameField: 'Почта',
                    value: 'pochta@yandex.ru',
                    typeInput: 'text',
                    disabled: true,
                },
                {
                    id: 'loginProfile',
                    nameField: 'Логин',
                    value: 'ivanivanov',
                    typeInput: 'text',
                    disabled: true,
                },
                {
                    id: 'usernameProfile',
                    nameField: 'Имя',
                    value: 'Иван',
                    typeInput: 'text',
                    disabled: true,
                },
                {
                    id: 'lastnameProfile',
                    nameField: 'Фамилия',
                    value: 'Иванов',
                    typeInput: 'text',
                    disabled: true,
                },
                {
                    id: 'chatName',
                    nameField: 'Имя в чате',
                    value: 'Иван',
                    typeInput: 'text',
                    disabled: true,
                },
                {
                    id: 'numberProfile',
                    nameField: 'Телефон',
                    value: '+7 (909) 967 30 30',
                    typeInput: 'text',
                    disabled: true,
                },
            ],
            fieldsPass: [
                {
                    id: 'oldPass',
                    nameField: 'Старый пароль',
                    value: 'old password',
                    typeInput: 'password',
                },
                {
                    id: 'newPass',
                    nameField: 'Новый пароль',
                    value: 'new password',
                    typeInput: 'password',
                },
                {
                    id: 'newRePass',
                    nameField: 'Повторите новый пароль',
                    value: 'new password',
                    typeInput: 'password',
                },
            ]
        }


    }

    render() {
        if (this.state.currentPage === "/login") {
            const template = Handlebars.compile(Pages.LoginPage)
            const context = {
                inputs: [
                    {
                        inputId: "inputText",
                        classInput: 'input',
                        typeInput: 'text',
                        placeholderInput: 'Логин',
                    },
                    {
                        inputId: "inputPassword",
                        classInput: 'input',
                        typeInput: 'password',
                        placeholderInput: 'Пароль',
                    },
                ],
                buttons: [
                    {
                        idButton: 'authBtn',
                        typeButton: 'button',
                        classButton: 'buttonAuth',
                        textButton: 'Авторизоваться',
                    },
                    {
                        idButton: 'linkBtn',
                        typeButton: 'button',
                        classButton: 'buttonLink',
                        textButton: 'Нет аккаунта?',
                    },
                ]
            }
            this.appElement.innerHTML = template(context)
        }
        if (this.state.currentPage === "/register") {
            const template = Handlebars.compile(Pages.RegisterPage)
            const context = {
                inputs: [
                    {
                        inputId: "email",
                        classInput: 'input',
                        typeInput: 'text',
                        placeholderInput: 'Почта',
                    },
                    {
                        inputId: "login",
                        classInput: 'input',
                        typeInput: 'text',
                        placeholderInput: 'Логин',
                    },
                    {
                        inputId: "firstname",
                        classInput: 'input',
                        typeInput: 'text',
                        placeholderInput: 'имя',
                    },
                    {
                        inputId: "lastname",
                        classInput: 'input',
                        typeInput: 'text',
                        placeholderInput: 'Фамилия',
                    },
                    {
                        inputId: "telephone",
                        classInput: 'input',
                        typeInput: 'number',
                        placeholderInput: 'Телефон',
                    },
                    {
                        inputId: "inputPassword",
                        classInput: 'input',
                        typeInput: 'password',
                        placeholderInput: 'Пароль',
                    },
                    {
                        inputId: "password",
                        classInput: 'input',
                        typeInput: 'password',
                        placeholderInput: 'Пароль',
                    },
                    {
                        inputId: "repassword",
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
                ]
            }
            this.appElement.innerHTML = template(context)
        }
        if (this.state.currentPage === "/chat") {
            const template = Handlebars.compile(Pages.ChatPage)
            const context = {
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
                    username: "username"
                },
            }
            this.appElement.innerHTML = template({
                ...context,
                emptyLog: this.state.emptyLog,
                chatLogMessages: this.state.chatLogMessages,
                modalInfo: this.state.modalInfo,
            })
        }
        if (this.state.currentPage === "/profile") {
            const template = Handlebars.compile(Pages.ProfilePage)
            const context = {
                avatarInfo: {
                    icon: "/images/userIcon.svg",
                    username: "Антоний",
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

            }
            this.appElement.innerHTML = template({
                ...context,
                fields: this.state.fields,
                updateData: this.updateData,
                updatePass: this.updatePass,
                fieldsPass: this.state.fieldsPass,
                saveButton: this.saveButton,
            })
        }
        this.attachEventListener();
    }

    attachEventListener() {
        if (this.state.currentPage === "/register") {
            const redirectButton = document.querySelector('#loginBtn');
            redirectButton.addEventListener('click', (e) => {
                e.preventDefault()
                this.changePage('/login')
            })
        }
        if (this.state.currentPage === "/login") {
            const redirectButton = document.querySelector('#linkBtn');
            const authorizeBtn = document.querySelector('#authBtn')
            authorizeBtn.addEventListener('click', (e) => {
                e.preventDefault()
                this.changePage('/chat')
            })
            redirectButton.addEventListener('click', (e) => {
                e.preventDefault()
                this.changePage('/register')
            })
        }
        if (this.state.currentPage === '/chat') {
            const actionHeaderMenu = document.querySelector('#headerActions')
            const actionInputMenu = document.querySelector('#inputSubmitAction')
            const openHeaderMenu = document.querySelector('.actionMenu')
            const openInputMenu = document.querySelector('.submitFormMessage__actions')
            const openModalAaddUser = document.querySelector('#addedUser')
            const openModalDeleteUser = document.querySelector('#deleteUser')
            const goToProfileBtn = document.querySelector('#goToProfile')

            goToProfileBtn.addEventListener('click', () => {
                this.state.currentPage = '/profile'
                this.render()
            })
            actionHeaderMenu.addEventListener("click", () => {
                openHeaderMenu.classList.toggle('activeMenu')
            })
            actionInputMenu.addEventListener("click", () => {
                openInputMenu.classList.toggle('activeMenu')
            })
            if (actionInputMenu) {
                const inputMediaValue = document.querySelector('#input_media')
                inputMediaValue.addEventListener('change', (e) => {
                    console.log(e.target.files[0])
                    const mediaUrl = URL.createObjectURL(e.target.files[0])
                    this.state.chatLogMessages.push({
                        id: this.state.chatLogMessages.length,
                        message: mediaUrl,
                        role: 1,
                        time: '12:00',
                        isImage: true,
                    })
                    this.render()
                })
            }
            openModalAaddUser.addEventListener('click', () => {
                const newValue = {
                    title: 'Добавить пользователя',
                    infoButton: {
                        ...this.state.modalInfo.infoButton,
                        textButton: 'Добавить',
                        idButton: 'addUser',
                    }
                }
                this.updateStateModal(newValue)

            })
            openModalDeleteUser.addEventListener('click', () => {
                const newValue = {
                    title: 'Удалить пользователя',
                    infoButton: {
                        ...this.state.modalInfo.infoButton,
                        textButton: 'Удалить',
                        idButton: 'deleteUser',
                    }
                }
                this.updateStateModal(newValue)

            })
            if (this.chatModal) {
                this.chatModal.addEventListener('click', () => {
                    this.chatModal.remove()
                    this.render()
                })
                this.modalChatContainer.addEventListener('click', (e) => {
                    e.stopPropagation()
                })
            }
        }

        if (this.state.currentPage === '/profile') {
            const updateDataBtn = document.querySelector('#updateData')
            const updatePassBtn = document.querySelector('#updatePassword')
            const backToChatBtn = document.querySelector('#backToChat')
            const logoutBtn = document.querySelector('#logout')

            backToChatBtn.addEventListener('click', () => {
                this.state.currentPage = '/chat'
                this.render()
            })
            if (updateDataBtn && updatePassBtn) {

                updateDataBtn.addEventListener('click', () => {
                    this.state.fields = this.state.fields.map((item) => ({ ...item, disabled: false }))
                    this.updateData = true
                    this.updatePass = false
                    this.saveButton = true
                    this.render()
                })
                updatePassBtn.addEventListener('click', () => {
                    this.updatePass = true
                    this.updateData = false
                    this.saveButton = true
                    this.render()
                })

                logoutBtn.addEventListener('click', () => {
                    this.state.currentPage = '/login'
                    this.render()
                })
            }

            if (this.updateData) {
                const saveDataBtn = document.querySelector('#saveDataBtn')
                const updateLogin = document.querySelector('#loginProfile')
                const updateUsername = document.querySelector('#usernameProfile')
                const updateLastname = document.querySelector('#lastnameProfile')
                const updateChatName = document.querySelector('#chatName')
                const updateNumber = document.querySelector('#numberProfile')
                const updateEmail = document.querySelector('#emailProfile')

                saveDataBtn.addEventListener('click', () => {
                    this.state.fields = this.state.fields.map((item) => ({ ...item, disabled: true }))
                    this.updateData = false
                    this.updatePass = false
                    this.saveButton = false
                    this.render()
                })

                updateLogin.addEventListener('change', (e) => {
                    this.changeDataProfile(e.currentTarget.id, e.target.value)
                })
                updateUsername.addEventListener('change', (e) => {
                    this.changeDataProfile(e.currentTarget.id, e.target.value)
                })
                updateLastname.addEventListener('change', (e) => {
                    this.changeDataProfile(e.currentTarget.id, e.target.value)
                })
                updateChatName.addEventListener('change', (e) => {
                    this.changeDataProfile(e.currentTarget.id, e.target.value)
                })
                updateNumber.addEventListener('change', (e) => {
                    this.changeDataProfile(e.currentTarget.id, e.target.value)
                })
                updateEmail.addEventListener('change', (e) => {
                    this.changeDataProfile(e.currentTarget.id, e.target.value)
                })
            }

            if (this.updatePass) {
                const saveDataBtn = document.querySelector('#saveDataBtn')
                const oldPassInput = document.querySelector('#oldPass')
                const newPassInput = document.querySelector('#newPass')
                const RePassInput = document.querySelector('#newRePass')

                saveDataBtn.addEventListener('click', () => {
                    this.updateData = false
                    this.updatePass = false
                    this.saveButton = false
                    this.render()
                })
                oldPassInput.addEventListener('change', (e) => {
                    this.changeDataPass(e.currentTarget.id, e.target.value)
                })
                newPassInput.addEventListener('change', (e) => {
                    this.changeDataPass(e.currentTarget.id, e.target.value)
                })
                RePassInput.addEventListener('change', (e) => {
                    this.changeDataPass(e.currentTarget.id, e.target.value)
                })
            }
        }

    }
    changePage(page) {
        this.state.currentPage = page;
        this.render();
    }

    updateStateModal(newModalInfo) {
        this.state = { ...this.state, modalInfo: { ...this.state.modalInfo, ...newModalInfo } }
        const chatContainer = document.querySelector('.chatContainer')
        const template = Handlebars.compile(ChatComponents.ModalChat)
        const html = template(this.state.modalInfo);

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const modalElement = tempDiv.firstElementChild;

        if (chatContainer && modalElement) {
            chatContainer.appendChild(modalElement);
            this.chatModal = document.querySelector('.modalChat')
            this.modalChatContainer = document.querySelector('.modalChat__container')
        }
        this.attachEventListener()
    }

    changeDataProfile(id, newValue) {
        this.state.fields = this.state.fields.map((item) => id === item.id ? { ...item, value: newValue } : { ...item })
        this.render()
    }
    changeDataPass(id, newValue) {
        this.state.fieldsPass = this.state.fieldsPass.map((item) => id === item.id ? { ...item, value: newValue } : { ...item })
        this.render()
    }

}