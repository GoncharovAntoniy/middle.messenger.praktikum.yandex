/* eslint-disable @typescript-eslint/no-explicit-any */
import Block from './Block';
import { render } from '../utils/renderDOM';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}
type BlockClass<Props extends Record<string, any> = any> = new (props: Props) => Block<Props>;

class Route {
  _pathname: string;
  _blockClass: BlockClass;
  _block: Block | null;
  _props: any;

  constructor(pathname: string, view: BlockClass, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    console.log(pathname);
    return isEqual(pathname, this._pathname);
  }

  render() {
    this._block = new this._blockClass({});
    render(this._props.rootQuery, this._block);
  }
}

class Router {
  private static __instance: Router;
  private routes: Route[];
  private history: History;
  protected currentRoute: Route | null;
  private _rootQuery: string;

  constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this._rootQuery = rootQuery;
  }

  static getInstance(rootQuery: string) {
    if (!Router.__instance) {
      Router.__instance = new Router(rootQuery);
    }
    return Router.__instance;
  }

  use(pathname: string, block: BlockClass) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      console.error(`Route not found: ${pathname}`);
      this.go('/errorPage');
      return;
    }

    this.currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route._pathname === pathname);
  }
}

export default Router;
