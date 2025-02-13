import { Button } from '../../../components/button';
import Block from '../../../framework/Block';
import store, { StoreEvents } from '../../../store/store';
import { TButton, TInput } from '../../../types';
import profileController from '../profileController';
import { inputModal } from './inputModal';

interface TProps {
  props: {
    infoInput: TInput;
    infoButton: TButton;
  };
}

export class ModalProfile extends Block {
  avatarIcon: string;
  constructor(props: TProps) {
    super({
      ...props,
      InputModalProfile: new inputModal({
        ...props.props.infoInput,
        onChange: (event: Event) => this.onChange(event),
      }),
      Button: new Button({ ...props.props.infoButton, onClick: () => this.updateIconAvatar() }),
    });
    this.avatarIcon = '';
    store.on(StoreEvents.Updated, () => null);
  }

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const iconUrl = URL.createObjectURL(file);
    store.set('modalProfileInfo.infoInput.value', iconUrl);
    store.set('modalProfileInfo.infoInput.file', file);
  }

  updateIconAvatar() {
    const icon = store.getState().modalProfileInfo.infoInput.file;
    profileController.updateAvatar(icon as Blob);
    store.set('contextProfile.modalProfile', false);
  }

  render() {
    const title = this.props.props?.title;
    return `<div class="modalProfile">
                    <div class="modalProfile__container">
                        <h4 class="modalProfile__container_title">${title}</h4>
                        {{{InputModalProfile}}}
                        {{{ Button }}}
                    </div>
                </div>
                `;
  }
}
