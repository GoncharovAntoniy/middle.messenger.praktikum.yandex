import Handlebars from 'handlebars';
import * as Pages from './pages/index';
import * as Components from './components/index'

Handlebars.registerPartial('Input', Components.Input)
Handlebars.registerPartial('Button', Components.Button)


export default class App {
    constructor() {
        this.state = {
            currentPage: '/chat'
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
                        idButton: 'loginBtn',
                        typeButton:'button',
                        classButton:'buttonAuth',
                        textButton: 'Авторизоваться',
                    },
                    {
                        idButton: 'linkBtn',
                        typeButton:'button',
                        classButton:'buttonLink',
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
                        typeButton:'button',
                        classButton:'buttonAuth',
                        textButton: 'Зарегистрироваться',
                    },
                    {
                        idButton: 'loginBtn',
                        typeButton:'button',
                        classButton:'buttonLink',
                        textButton: 'Войти',
                    },
                ]
            }
            this.appElement.innerHTML = template(context)
        }
        if (this.state.currentPage === "/chat") {
            const template = Handlebars.compile(Pages.ChatPage)
            this.appElement.innerHTML = template()
        }
        this.attachEventListener();
    }

    attachEventListener() {
        if (this.state.currentPage === "/login") {
            const redirectButton = document.querySelector('.redirectRegister');
            // redirectButton.addEventListener('click', (e) => {
            //     e.preventDefault()
            //     this.changePage('/register')
            // })
            this.changePage()
        }
    }
    changePage(page) {
        this.state.currentPage = page;
        this.render();
    }
}