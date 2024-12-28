/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-empty-function */
import EventBus, { EventCallback } from './EventBus';
import * as Handlebars from 'handlebars';

export interface BlockProps {
  props?: {
    // Пришлось добавить any потому, что в некоторых местах использую конструкция для получения и изменения пропсов типа this.props.prop?...
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  setProps?: (value: object) => void;
  [key: string]: unknown | (() => void) | string | number | boolean | HTMLElement | HTMLInputElement | Record<string, unknown> | undefined | void | EventListener | Block | Block[];
}

interface AttributeProps {
  [key: string]: string;
}

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  protected _element: HTMLElement | null = null;
  protected _id: number = Math.floor(100000 + Math.random() * 900000);
  public props: BlockProps;
  public children: Record<string, Block>;
  public lists: Record<string, unknown[]>;
  protected eventBus: () => EventBus;

  constructor(propsWithChildren: BlockProps = {} as BlockProps) {
    const eventBus = new EventBus();
    const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.lists = this._makePropsProxy({ ...lists });
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents(): void {
    const { events = {} } = this.props as { events?: Record<string, EventListener> };
    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this) as EventCallback);
  }

  protected init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  protected componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate(oldProps?: BlockProps, newProps?: BlockProps): boolean {
    console.log('oldProps', oldProps);
    console.log('newProps', newProps);
    return true;
  }

  private _getChildrenPropsAndProps(propsAndChildren: BlockProps): {
    children: Record<string, Block>;
    props: BlockProps;
    lists: Record<string, Block[]>;
  } {
    const children: Record<string, Block> = {};
    const props: BlockProps = {};
    const lists: Record<string, Block[]> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((item) => item instanceof Block)) {
        lists[key] = value as Block[];
      } else {
        props[key] = value;
      }
    });

    return { children, props: props as BlockProps, lists };
  }

  protected addAttributes(): void {
    const { attr = {} } = this.props as { attr?: AttributeProps };

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value);
      }
    });
  }

  protected setAttributes(attr: AttributeProps): void {
    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value);
      }
    });
  }

  public setProps(nextProps: BlockProps): void {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  public getProps() {
    return this.props;
  }

  public setLists(nextList: Record<string, Block[]>): void {
    if (!nextList) {
      return;
    }

    Object.assign(this.lists, nextList);
  }

  public setChild(nextChild: Record<string, Block>): void {
    if (!nextChild) {
      return;
    }

    Object.assign(this.children, nextChild);
  }

  public removeLists(nameList: string): void {
    this.lists = Object.fromEntries(Object.entries(this.lists).filter(([key]) => key !== nameList));
  }

  public removeChildren(nameChild: string): void {
    this.children = Object.fromEntries(Object.entries(this.children).filter(([key]) => key !== nameChild));
  }

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const propsAndStubs = { ...this.props };
    const tmpId = Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.lists).forEach(([, child]) => {
      const listCont = this._createDocumentElement('template');
      child.forEach((item) => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent());
        } else {
          listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
      if (stub) {
        stub.replaceWith(listCont.content);
      }
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  protected render(): string {
    return '';
  }

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Element is not created');
    }
    return this._element;
  }

  private _makePropsProxy<T extends object>(props: T): T {
    const self = this;

    return new Proxy(props, {
      get(target: T, prop: string | symbol) {
        const value = target[prop as keyof T];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: T, prop: string | symbol, value) {
        const oldTarget = { ...target };
        target[prop as keyof T] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  public show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'flex';
      this._render();
    }
  }

  public hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}
