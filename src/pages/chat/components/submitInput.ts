import Block from "../../../framework/Block";

export class SubmitInput extends Block {
  constructor(props) {
    super({ ...props })
  }

  render() {
    return `<form class="submitFormMessage" action="">
              <img
                id="inputSubmitAction"
                class="submitFormMessage__action"
                src="/images/paperclipIcon.svg"
                alt=""
              />
              <input
                id="{{infoSubmitInput.id}}"
                class="submitFormMessage__input"
                type="{{infoSubmitInput.type}}"
                name="{{infoSubmitInput.name}}"
                placeholder="Сообщение"
              />
              <button class="submitFormMessage__button" type="submit"><img
                  src="/images/arrowRightIcon.svg"
                  alt=""
                /></button>

              <div class="submitFormMessage__actions">
                <label class="submitFormMessage__actions_item" for="input_media">
                  <img src="/images/fotoAction.svg" alt="icon" />
                  <input
                    id="input_media"
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    class="submitFormMessage__actions_item-media"
                  />
                  <span>

                    Фото или Видео
                  </span>
                </label>

                <label for="input_file" class="submitFormMessage__actions_item">
                  <img src="/images/fileAction.svg" alt="icon" />
                  <input
                    id="input_file"
                    type="file"
                    multiple
                    class="submitFormMessage__actions_item-file"
                  />
                  <span>

                    Файл
                  </span>
                </label>
                <label for="input_location" class="submitFormMessage__actions_item">
                  <img src="/images/locationAction.svg" alt="icon" />
                  <input
                    id="input_location"
                    type="file"
                    multiple
                    class="submitFormMessage__actions_item-location"
                  />
                  <span>

                    Локация
                  </span>
                </label>
              </div>
            </form>`
  }
}
