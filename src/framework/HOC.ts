/* eslint-disable @typescript-eslint/no-explicit-any */
import store, { StoreEvents } from '../store/store';
import Block from './Block';

type Indexed<T = unknown> = {
  [key in string]: T;
};

// export function connect(Component: typeof Block, store: any) {
//   return class extends Component {
//     constructor(...args: any[]) {
//       super(...args);

//       store.subscribe(() => {
//         const state = store.getState();
//         this.setProps({ props: state });
//       });
//     }
//   };
// }

// export function connectNew<P extends Record<string, any>>(mapStateToProps?: (state: Record<string, any>) => P) {
//   return function wrapComponent(Component: typeof Block) {
//     return class ConnectedComponent extends Component {
//       constructor(props: any) {
//         const stateProps = mapStateToProps ? mapStateToProps(store.getState()) : store.getState();
//         super({ ...props, ...stateProps });

//         store.subscribe((newState: any) => {
//           const newProps = mapStateToProps ? mapStateToProps(newState) : newState;
//           this.setProps({ props: newProps });
//         });
//       }
//     };
//   };
// }

// export function connectMini(Component, state) {
//   store.subscribe(() => {
//     const state = store.getState();
//     this.setProps({ props: state });
//   });
//   return Component.setProps({ props: state });
// }
// export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
//   // используем class expression
//   return class extends Component {
//     constructor(props) {
//       super({ ...props, ...mapStateToProps(store.getState()) });

//       // подписываемся на событие
//       store.on(StoreEvents.Updated, () => {
//         // вызываем обновление компонента, передав данные из хранилища
//         this.setProps({ ...mapStateToProps(store.getState()) });
//       });
//     }
//   };
// }

// export function connect<P extends Record<string, any>>(
//   Component: typeof Block,
//   store: { getState: () => Record<string, any>; subscribe: (callback: () => void) => () => void },
//   mapStateToProps?: (state: Record<string, any>) => P,
// ) {
//   return class extends Component {
//     private unsubscribe: () => void;

//     constructor(...args: any[]) {
//       const stateProps = mapStateToProps ? mapStateToProps(store.getState()) : store.getState();
//       super({ ...args[0], ...stateProps });
//       this.unsubscribe = store.subscribe(() => {
//         const state = store.getState();
//         const newProps = mapStateToProps ? mapStateToProps(state) : state;
//         if (JSON.stringify(newProps) !== JSON.stringify(this.props)) {
//           this.setProps({ ...newProps });
//         }
//         // this.setProps({ props: { ...newProps } });
//       });
//     }

//     componentWillUnmount() {
//       if (typeof this.unsubscribe === 'function') {
//         this.unsubscribe();
//       }
//     }
//   };
// }

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
