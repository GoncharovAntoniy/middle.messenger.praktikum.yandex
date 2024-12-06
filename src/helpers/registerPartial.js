import Handlebars from 'handlebars';
import * as Components from '../components/index'
import * as ChatComponents from '../pages/chat/components'
import * as Modules from '../pages/chat/modules'
import * as ProfileComponents from '../pages/profile/components/index'

export const registerPartial = () => {
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
    Handlebars.registerPartial('ModalUpdateIconProfile', ProfileComponents.ModalUpdateIconProfile)
    Handlebars.registerPartial('InputModalProfile', ProfileComponents.InputModalProfile)
}
