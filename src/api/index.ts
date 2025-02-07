import { queryStringify } from '../utils/queryStringify';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Headers = Record<string, string>;

type RequestData = Record<string, unknown> | string | FormData | null;

interface Options {
  method?: METHODS;
  data?: RequestData;
  headers?: Headers;
  timeout?: number;
}

type OptionsWithoutMethod = Omit<Options, 'method'>;

type HTTPMethod = <R = unknown>(url: string, options?: OptionsWithoutMethod) => Promise<R>;

// function queryStringify(data: Record<string, unknown>): string {
//   if (typeof data !== 'object' || data === null) {
//     throw new Error('Data must be an object');
//   }

//   function buildQueryString(prefix: string, value: any): string {
//     if (Array.isArray(value)) {
//       return value.map((item, index) => buildQueryString(`${prefix}[${index}]`, item)).join('&');
//     } else if (typeof value === 'object' && value !== null) {
//       return Object.entries(value)
//         .map(([key, val]) => buildQueryString(`${prefix}[${encodeURIComponent(key)}]`, val))
//         .join('&');
//     } else {
//       return `${encodeURIComponent(prefix)}=${encodeURIComponent(String(value))}`;
//     }
//   }

//   return Object.entries(data)
//     .map(([key, value]) => buildQueryString(encodeURIComponent(key), value))
//     .join('&');
// }

const baseHost = 'https://ya-praktikum.tech';

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => {
    const totalURL = baseHost + url;
    return this.request(totalURL, { ...options, method: METHODS.GET }, options.timeout);
  };

  post: HTTPMethod = (url, options = {}) => {
    const totalURL = baseHost + url;
    return this.request(totalURL, { ...options, method: METHODS.POST }, options.timeout);
  };

  put: HTTPMethod = (url, options = {}) => {
    const totalURL = baseHost + url;
    return this.request(totalURL, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete: HTTPMethod = (url, options = {}) => {
    const totalURL = baseHost + url;
    return this.request(totalURL, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request<R = unknown>(url: string, options: Options = {}, timeout = 5000): Promise<R> {
    const { headers = {}, method, data } = options;

    return new Promise<R>((resolve, reject) => {
      if (!method) {
        reject(new Error('No method specified'));
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}?${queryStringify(data as Record<string, unknown>)}` : url);

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response as R);
        } catch {
          resolve(xhr.responseText as R);
        }
      };

      xhr.onabort = () => reject(new Error('Request aborted'));
      xhr.onerror = () => reject(new Error('Network error'));
      xhr.ontimeout = () => reject(new Error('Request timeout'));

      xhr.timeout = timeout;

      if (isGet || !data) {
        xhr.send();
      } else if (typeof data === 'string' || data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
