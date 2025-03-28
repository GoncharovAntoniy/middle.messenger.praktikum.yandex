function isLength(value: unknown): value is number {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER;
}

function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

function isArrayLike(value: unknown): value is { length: number } {
  return !isNil(value) && typeof value !== 'function' && isLength((value as { length: number }).length);
}

function isObjectLike(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

function getTag(value: unknown): string {
  if (value === null) {
    return '[object Null]';
  }
  if (value === undefined) {
    return '[object Undefined]';
  }
  return Object.prototype.toString.call(value);
}

const objectProto = Object.prototype;
function isPrototype(value: unknown): boolean {
  const ctor = (value as any)?.constructor;
  const proto = (typeof ctor === 'function' && ctor.prototype) || objectProto;
  return value === proto;
}

function isArguments(value: unknown): value is IArguments {
  return isObjectLike(value) && getTag(value) === '[object Arguments]';
}

export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (isArrayLike(value) && (Array.isArray(value) || typeof value === 'string' || typeof (value as any).splice === 'function' || isArguments(value))) {
    return !(value as { length: number }).length;
  }

  const tag = getTag(value);
  if (tag === '[object Map]' || tag === '[object Set]') {
    return !(value as Map<unknown, unknown> | Set<unknown>).size;
  }

  if (isPrototype(value)) {
    return !Object.keys(value).length;
  }

  for (const key in value as object) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  return true;
}
