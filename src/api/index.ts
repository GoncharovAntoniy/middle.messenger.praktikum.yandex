import { queryStringify } from '../utils/queryStringify';
import { BASE_URL } from './baseURL';

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

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => {
    const totalURL = BASE_URL + url;
    return this.request(totalURL, { ...options, method: METHODS.GET }, options.timeout);
  };

  post: HTTPMethod = (url, options = {}) => {
    const totalURL = BASE_URL + url;
    return this.request(totalURL, { ...options, method: METHODS.POST }, options.timeout);
  };

  put: HTTPMethod = (url, options = {}) => {
    const totalURL = BASE_URL + url;
    return this.request(totalURL, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete: HTTPMethod = (url, options = {}) => {
    const totalURL = BASE_URL + url;
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
