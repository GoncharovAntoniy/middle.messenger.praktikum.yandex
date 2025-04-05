/* eslint-disable @typescript-eslint/no-explicit-any */
import { merge } from './merge';

type Indexed<T = unknown> = {
  [key in string]: T;
};

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  const keys = path.split('.');
  const resultObj = keys.reduceRight((acc, key) => ({ [key]: acc }), value);
  if ((object as Indexed).constructor === Object) {
    return merge(object as Indexed, resultObj as Indexed);
  }
  return object;
}

export default set;

// Авторсокое решение
export function setAuthor(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }
  console.log('test');
  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any,
  );
  return merge(object as Indexed, result);
}
