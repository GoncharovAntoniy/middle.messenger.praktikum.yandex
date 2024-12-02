import Handlebars from 'handlebars';
import * as Pages from './pages/index';
import * as Components from './components/index'
import * as ChatComponents from './pages/chat/components'
import * as Modules from './pages/chat/modules'

Handlebars.registerPartial('Input', Components.Input)
Handlebars.registerPartial('Button', Components.Button)
Handlebars.registerPartial('EmptyChatLog', ChatComponents.EmptyChatLog)
Handlebars.registerPartial('Avatar', ChatComponents.Avatar)
Handlebars.registerPartial('HeaderSearch', ChatComponents.HeaderSearch)
Handlebars.registerPartial('HeaderChat', ChatComponents.HeaderChat)
Handlebars.registerPartial('SearchChatInput', ChatComponents.SearchChatInput)
Handlebars.registerPartial('SubmitInput', ChatComponents.SubmitInput)
Handlebars.registerPartial('ChatLog', ChatComponents.ChatLog)
Handlebars.registerPartial('SearchAndListUsersModule', Modules.SearchAndListUsersModule)
Handlebars.registerPartial('MessageModule', Modules.MessageModule)


export default class App {
    constructor() {
        this.state = {
            currentPage: '/register',
            chatLogMessages: [
                {
                    id: 1,
                    message: 'bla bla bla',
                    role: 0,
                    time: '12:00',
                },
                {
                    id: 2,
                    message: 'bla bla bla',
                    role: 1,
                    time: '12:00',
                },
                {
                    id: 3,
                    message: 'bla bla bla',
                    role: 0,
                    time: '12:00',
                },
                {
                    id: 4,
                    message: 'bla bla bla dddddddddd cbhdjhbc sdjhcbjsd chdhbsjdhc sdhbchjbds cjshdcbhbjdhc sdhbcjhbsdjhc dhbcjh sdc hbsjdhc',
                    role: 1,
                    time: '12:00',
                },
                {
                    id: 5,
                    message: 'bla bla bla hdcbjhsbd shcbjhdscb cshsjhcbs jchbsdjh chsdhcbjhdsc ',
                    role: 0,
                    time: '12:00',
                },
                {
                    id: 6,
                    message: 'bla bla bla dddddddddd cbhdjhbc sdjhcbjsd chdhbsjdhc sdhbchjbds cjshdcbhbjdhc sdhbcjhbsdjhc dhbcjh sdc hbsjdhc',
                    role: 1,
                    time: '12:00',
                },
                {
                    id: 7,
                    message: 'bla bla bla dddddddddd cbhdjhbc sdjhcbjsd chdhbsjdhc sdhbchjbds cjshdcbhbjdhc sdhbcjhbsdjhc dhbcjh sdc hbsjdhc',
                    role: 0,
                    time: '12:00',
                },
                {
                    id: 8,
                    message: 'bla bla bla dddddddddd cbhdjhbc sdjhcbjsd chdhbsjdhc sdhbchjbds cjshdcbhbjdhc sdhbcjhbsdjhc dhbcjh sdc hbsjdhc',
                    role: 1,
                    time: '12:00',
                },
                {
                    id: 3,
                    message: 'bla bla bla',
                    role: 0,
                    time: '12:00',
                },
                {
                    id: 4,
                    message: 'bla bla bla dddddddddd cbhdjhbc sdjhcbjsd chdhbsjdhc sdhbchjbds cjshdcbhbjdhc sdhbcjhbsdjhc dhbcjh sdc hbsjdhc',
                    role: 1,
                    time: '12:00',
                },
                {
                    id: 5,
                    message: 'bla bla bla hdcbjhsbd shcbjhdscb cshsjhcbs jchbsdjh chsdhcbjhdsc ',
                    role: 0,
                    time: '12:00',
                },
                {
                    id: 6,
                    message: 'bla bla bla dddddddddd cbhdjhbc sdjhcbjsd chdhbsjdhc sdhbchjbds cjshdcbhbjdhc sdhbcjhbsdjhc dhbcjh sdc hbsjdhc',
                    role: 1,
                    time: '12:00',
                },
                {
                    id: 7,
                    message: 'bla bla bla dddddddddd cbhdjhbc sdjhcbjsd chdhbsjdhc sdhbchjbds cjshdcbhbjdhc sdhbcjhbsdjhc dhbcjh sdc hbsjdhc',
                    role: 0,
                    time: '12:00',
                },
                {
                    id: 8,
                    message: 'bla bla bla dddddddddd cbhdjhbc sdjhcbjsd chdhbsjdhc sdhbchjbds cjshdcbhbjdhc sdhbcjhbsdjhc dhbcjh sdc hbsjdhc',
                    role: 1,
                    time: '12:00',
                },
            ]
        }
        this.appElement = document.getElementById("app")
        this.emptyLog = false
        this.openMenuActionHeader = false
        this.openMenuActionSubmitForm = false
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
                }
            }
            this.appElement.innerHTML = template({
                ...context,
                emptyLog: this.emptyLog,
                openMenuActionHeader: this.openMenuActionHeader,
                openMenuActionSubmitForm: this.openMenuActionSubmitForm,
                chatLogMessages: this.state.chatLogMessages

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
            console.log('actionInputMenu', actionInputMenu)
            actionHeaderMenu.addEventListener("click", () => {
                this.openMenuActionHeader = !this.openMenuActionHeader
                this.render()
            })
            actionInputMenu.addEventListener("click", () => {
                this.openMenuActionSubmitForm = !this.openMenuActionSubmitForm
                this.render()
            })
        }

    }
    changePage(page) {
        this.state.currentPage = page;
        this.render();
    }
}