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
Handlebars.registerPartial('SearchChatInput', ChatComponents.SearchChatInput)
Handlebars.registerPartial('SearchAndListUsersModule', Modules.SearchAndListUsersModule)


export default class App {
    constructor() {
        this.state = {
            currentPage: '/register'
        }
        this.appElement = document.getElementById("app")
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
                        notReadMessageCount: '2',
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
                    {
                        username: 'Владимир',
                        lastMessage: 'тестим аватар',
                        time: '19:20',
                        notReadMessageCount: '3',
                    },
                ]
            }
            this.appElement.innerHTML = template(context)
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
    }
    changePage(page) {
        this.state.currentPage = page;
        this.render();
    }
}