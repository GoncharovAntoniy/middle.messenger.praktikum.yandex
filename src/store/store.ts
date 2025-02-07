/* eslint-disable @typescript-eslint/no-explicit-any */
import { state as initialState } from '../consts/consts';
import Block from '../framework/Block';
import EventBus from '../framework/EventBus';
import { isEqualAuthor } from '../utils/isEqualUtil';
import set from '../utils/set';

type Indexed<T = any> = {
  [key in string]: T;
};

export enum StoreEvents {
  Updated = 'updated',
}

const subscribers: { component: Block; mapStateToProps: (state: Indexed) => Indexed }[] = [];

class Store extends EventBus {
  private state = initialState;

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    // console.log(`Store update: ${path} =`, value);
    set(this.state, path, value);

    subscribers.forEach(({ component, mapStateToProps }) => {
      const newState = mapStateToProps(this.state);
      if (!isEqualAuthor(component.props, newState)) {
        component.setProps({ ...newState });
      }
      this.emit(StoreEvents.Updated);
    });
  }
}

export default new Store();
const store = new Store();

export function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: any) {
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        subscribers.push({ component: this, mapStateToProps });
        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqualAuthor(state, newState)) {
            this.setProps({ ...newState });
          }
          state = newState;
        });
      }
    };
  };
}
