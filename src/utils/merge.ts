/* eslint-disable no-prototype-builtins */
type Indexed<T = unknown> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if ((rhs[p] as Indexed).constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export function merge2(lhs: Indexed, rhs: Indexed): Indexed {
  const result: Indexed = {};

  for (const key in lhs) {
    if (lhs.hasOwnProperty(key)) {
      if (typeof lhs[key] === 'object' && lhs[key] !== null && rhs[key] && typeof rhs[key] === 'object') {
        result[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
      } else {
        result[key] = lhs[key];
      }
    }
  }

  for (const key in rhs) {
    if (rhs.hasOwnProperty(key)) {
      if (!result.hasOwnProperty(key)) {
        result[key] = rhs[key];
      }
    }
  }

  return result;
}
