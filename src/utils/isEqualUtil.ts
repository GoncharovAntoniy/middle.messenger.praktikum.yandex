/* eslint-disable @typescript-eslint/no-explicit-any */
type Indexed<T = any> = {
  [key in string]: T;
};

function isEqual(a: Indexed, b: Indexed): boolean {
  if (a === b) {
    return true;
  }
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }
  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !isEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

export default isEqual;

// Автороское решение

type PlainObject<T = any> = {
  [k in string]: T;
};
function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object' && value !== null && value.constructor === Object && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export function isEqualAuthor(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}
