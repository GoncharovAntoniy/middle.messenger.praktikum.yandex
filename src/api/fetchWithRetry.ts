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
  tries?: number;
}
type OptionsWithoutMethod = Omit<Options, 'method'>;

export async function fetchWithRetry(url: string, options: OptionsWithoutMethod = {}): Promise<Response> {
  const { tries = 1 } = options;

  function onError(err: unknown) {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }

    return fetchWithRetry(url, { ...options, tries: triesLeft });
  }

  try {
    return await fetch(url, options);
  } catch (err_1) {
    return onError(err_1);
  }
}
