enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Headers = Record<string, string>;

type Options = {
  method?: METHODS;
  data?: Record<string, unknown> | string | FormData | null;
  headers?: Headers;
  timeout?: number;
};
type OptionsWithoutMethod = Omit<Options, 'method'>;

function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be an object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value = encodeURIComponent(String(data[key]));
    return `${result}${key}=${value}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export class HTTPTransport {
  get = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  post = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  put = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: Options = {}, timeout = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method specified'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data as Record<string, unknown>)}` : url);

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = function () {
        resolve(xhr);
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
  };
}
