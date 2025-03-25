import { BaseApi } from './base-api';
import { HTTPTransport } from '.';

const registerApiInstance = new HTTPTransport();

export class RegisterApi extends BaseApi {
  createRegister(data: Record<string, any>) {
    return registerApiInstance.post('/api/v2/auth/signup', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: data,
    });
  }
}
