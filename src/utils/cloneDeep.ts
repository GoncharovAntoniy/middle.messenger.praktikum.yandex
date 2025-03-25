/* eslint-disable @typescript-eslint/no-explicit-any */
function cloneDeep<T extends object = object>(obj: T) {
  const seen = new WeakMap();

  function deepCopy(value: any): any {
    if (value === null || typeof value !== 'object') {
      return value;
    }

    if (seen.has(value)) {
      return seen.get(value);
    }

    if (Array.isArray(value)) {
      const arrCopy: any = [];
      seen.set(value, arrCopy);
      for (const item of value) {
        arrCopy.push(deepCopy(item));
      }
      return arrCopy;
    }

    const objCopy: any = {};
    seen.set(value, objCopy);
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        objCopy[key] = deepCopy(value[key]);
      }
    }
    return objCopy;
  }

  return deepCopy(obj) as T;
}

export default cloneDeep;
type Indexed = {
  [key in string]: any;
};

// Авторское решение
export function cloneDeepAuthor<T extends Indexed>(obj: T) {
  return (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    // Handle:
    // * null
    // * undefined
    // * boolean
    // * number
    // * string
    // * symbol
    // * function
    if (item === null || typeof item !== 'object') {
      return item;
    }

    // Handle:
    // * Date
    if (item instanceof Date) {
      return new Date(item.getTime());
    }

    // Handle:
    // * Array
    if (item instanceof Array) {
      const copy: any = [];

      item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

      return copy;
    }

    // Handle:
    // * Set
    if (item instanceof Set) {
      const copy = new Set();

      item.forEach((v) => copy.add(_cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Map
    if (item instanceof Map) {
      const copy = new Map();

      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Object
    if (item instanceof Object) {
      const copy: object = {};

      // Handle:
      // * Object.symbol
      Object.getOwnPropertySymbols(item).forEach((s) => ((copy as any)[s] = _cloneDeep((item as any)[s])));

      // Handle:
      // * Object.name (other)
      Object.keys(item).forEach((k) => ((copy as any)[k] = _cloneDeep((item as any)[k])));

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  })(obj);
}
