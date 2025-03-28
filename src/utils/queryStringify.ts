/* eslint-disable @typescript-eslint/no-explicit-any */
export function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be an object');
  }

  function buildQueryString(prefix: string, value: any): string {
    if (Array.isArray(value)) {
      return value.map((item, index) => buildQueryString(`${prefix}[${index}]`, item)).join('&');
    } else if (typeof value === 'object' && value !== null) {
      return Object.entries(value)
        .map(([key, val]) => buildQueryString(`${prefix}[${key}]`, val))
        .join('&');
    } else {
      return `${prefix}=${encodeURIComponent(String(value))}`;
    }
  }

  return Object.entries(data)
    .map(([key, value]) => buildQueryString(key, value))
    .join('&');
}

// Авторское решение
type StringIndexed = Record<string, any>;
export function queryStringifyAuthor(data: StringIndexed): string | never {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value = data[key];
    const endLine = index < keys.length - 1 ? '&' : '';

    if (Array.isArray(value)) {
      const arrayValue = value.reduce<StringIndexed>(
        (result, arrData, index) => ({
          ...result,
          [`${key}[${index}]`]: arrData,
        }),
        {},
      );

      return `${result}${queryStringify(arrayValue)}${endLine}`;
    }

    if (typeof value === 'object') {
      const objValue = Object.keys(value || {}).reduce<StringIndexed>(
        (result, objKey) => ({
          ...result,
          [`${key}[${objKey}]`]: value[objKey],
        }),
        {},
      );

      return `${result}${queryStringify(objValue)}${endLine}`;
    }

    return `${result}${key}=${value}${endLine}`;
  }, '');
}
