/* eslint-disable @typescript-eslint/no-explicit-any */
import store, { StoreEvents } from '../store/store';
import Block from './Block';

type Indexed<T = unknown> = {
  [key in string]: T;
};

export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
  // используем class expression
  return class extends Component {
    constructor(props: any) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        // вызываем обновление компонента, передав данные из хранилища
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
