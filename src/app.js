import Handlebars from 'handlebars';
import * as Pages from './pages/index';
import * as ChatComponents from './pages/chat/components'
import * as ProfileComponents from './pages/profile/components/index'
import { state } from './consts/consts';
import { documentElements } from './consts/elements';
import { registerPartial } from './helpers/registerPartial';

registerPartial()


export default class App {
    constructor() {
        this.appElement = document.getElementById("app")
        this.updateData = false
        this.updatePass = false
        this.saveButton = false
        this.state = state
    }

    render() {
        if (this.state.currentPage === "/login") {
            const template = Handlebars.compile(Pages.LoginPage)
            this.appElement.innerHTML = template(this.state.contextLogin)
        }
        if (this.state.currentPage === "/register") {
            const template = Handlebars.compile(Pages.RegisterPage)
            this.appElement.innerHTML = template(this.state.contextRegister)
        }
        if (this.state.currentPage === "/chat") {
            const template = Handlebars.compile(Pages.ChatPage)
            this.appElement.innerHTML = template({
                ...this.state.contextChat,
                emptyLog: this.state.emptyLog,
                chatLogMessages: this.state.chatLogMessages,
                modalInfo: this.state.modalInfo,
            })
        }
        if (this.state.currentPage === "/profile") {
            const template = Handlebars.compile(Pages.ProfilePage)
            this.appElement.innerHTML = template({
                ...this.state.contextProfile,
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
            const { redirectButton } = documentElements()
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
            const { actionHeaderMenu,
                actionInputMenu,
                openHeaderMenu,
                openInputMenu,
                openModalAaddUser,
                openModalDeleteUser,
                goToProfileBtn,
                chatModal,
                modalChatContainer,
            } = documentElements()

            goToProfileBtn.addEventListener('click', () => {
                this.state.currentPage = '/profile'
                this.render()
            })
            actionHeaderMenu.addEventListener("click", () => {
                openHeaderMenu.classList.toggle('active')
            })
            actionInputMenu.addEventListener("click", () => {
                openInputMenu.classList.toggle('active')
            })
            if (actionInputMenu) {
                const { inputMediaValue } = documentElements()
                inputMediaValue.addEventListener('change', (e) => {
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
            if (chatModal) {
                chatModal.addEventListener('click', () => {
                    chatModal.remove()
                    this.render()
                })
                modalChatContainer.addEventListener('click', (e) => {
                    e.stopPropagation()
                })
            }
        }

        if (this.state.currentPage === '/profile') {
            const {
                updateDataBtn,
                updatePassBtn,
                backToChatBtn,
                logoutBtn,
                modalProfile,
                modalProfileContainer,
                iconProfile,
                inputAddFoto,
                buttonUpdateFoto,
            } = documentElements()


            backToChatBtn.addEventListener('click', () => {
                this.state.currentPage = '/chat'
                this.render()
            })

            iconProfile.addEventListener('click', () => {

                this.updateStateModalProfile(this.state.modalProfileInfo, false)
            })
            if (modalProfile) {

                modalProfile.addEventListener('click', () => {
                    modalProfile.remove()
                    this.render()
                })
                modalProfileContainer.addEventListener('click', (e) => {
                    e.stopPropagation()
                })
                inputAddFoto.addEventListener('change', (e) => {
                    const mediaUrl = URL.createObjectURL(e.target.files[0])
                    this.updateStateModalProfile({ ...this.state.modalProfileInfo, infoInput: { ...this.state.modalProfileInfo.infoInput, value: mediaUrl } }, true)

                })
                buttonUpdateFoto.addEventListener('click', () => {
                    const baseClass = 'profile__infoUser_avatar-container_icon'
                    this.state.contextProfile.avatarInfo.classAvatar = `${baseClass} iconAvatar`
                    this.state.contextProfile.avatarInfo.avatar = this.state.modalProfileInfo.infoInput.value
                    this.state.modalProfileInfo.infoInput.value = ''
                    this.render()
                })
            }

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
                const { saveDataBtn,
                    updateLogin,
                    updateUsername,
                    updateLastname,
                    updateChatName,
                    updateNumber,
                    updateEmail } = documentElements()

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
                const { saveDataBtn, oldPassInput, newPassInput, RePassInput } = documentElements()

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
        const { chatContainer } = documentElements()
        const template = Handlebars.compile(ChatComponents.ModalChat)
        const html = template(this.state.modalInfo);

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const modalElement = tempDiv.firstElementChild;

        if (chatContainer && modalElement) {
            chatContainer.appendChild(modalElement);
        }
        this.attachEventListener()
    }
    updateStateModalProfile(newModalInfo, update) {
        this.state = { ...this.state, modalProfileInfo: { ...this.state.modalProfileInfo, ...newModalInfo } }
        const { profile, modalProfile } = documentElements()
        const template = Handlebars.compile(ProfileComponents.ModalUpdateIconProfile)
        const html = template(this.state.modalProfileInfo);

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const modalElement = tempDiv.firstElementChild;

        if (profile && modalElement) {
            if (update) {
                modalProfile.innerHTML = template(this.state.modalProfileInfo)
            } else {

                profile.appendChild(modalElement);
            }
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