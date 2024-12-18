/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// @ts-ignore
import { state } from "./consts/consts";
import { Chat } from "./pages/chat/chat";
import { Login } from "./pages/login/login";
import { Profile } from "./pages/profile/profile";
import { Register } from "./pages/register/register";

export default class App {
  public state;
  private appElement: HTMLElement | null;

  constructor() {
    // @ts-ignore
    this.state = state;
    this.appElement = document.getElementById("app");
  }

  render(): string {
    if (this.state.currentPage === "/login") {
      const loginPage = new Login({
        props: this.state.contextLogin,
      });
      if (this.appElement) {
        this.appElement.replaceWith(loginPage.getContent());
      }
    }
    if (this.state.currentPage === "/register") {
      const registerPage = new Register({
        props: this.state.contextRegister,
      });
      if (this.appElement) {
        this.appElement.replaceWith(registerPage.getContent());
      }
    }
    if (this.state.currentPage === "/chat") {
      const props = {
        contextChat: this.state.contextChat,
        emptyLog: this.state.emptyLog,
        chatLogMessages: this.state.chatLogMessages
      }
      const chatPage = new Chat({
        props: props
      });
      if (this.appElement) {
        this.appElement.replaceWith(chatPage.getContent());
      }
    }
    if (this.state.currentPage === "/profile") {
      const props = {
        modalProfileInfo: this.state.modalProfileInfo,
        contextProfile: this.state.contextProfile,
        fieldsPass: this.state.fieldsPass,
        fields: this.state.fields,
        currentPage: this.state.currentPage
      }
      const profilePage = new Profile({
        props: props
      });
      if (this.appElement) {
        this.appElement.replaceWith(profilePage.getContent());
      }
    }
    return "";
  }
}
