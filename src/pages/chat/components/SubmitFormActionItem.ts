import Block from '../../../framework/Block';
import { TSubmitActionItem } from '../../../types';

interface TProps extends TSubmitActionItem {
  onClick: (e: Event) => void;
}

export class SubmitFormActionItem extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick(e),
      },
    });
  }
  render() {
    return `
             <label class="submitFormMessage__actions_item" for="{{actionId}}">
                  <img src="{{icon}}" alt="icon" />
                  <input
                    id="{{actionId}}"
                    type="{{actionType}}"
                    accept="{{accept}}"
                    multiple
                    class="submitFormMessage__actions_item-{{class}}"
                  />
                  <span>
                    {{textItem}}
                  </span>
            </label>
        `;
  }
}
