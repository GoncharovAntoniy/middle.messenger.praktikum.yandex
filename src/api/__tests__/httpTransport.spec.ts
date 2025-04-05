/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import * as sinon from 'sinon';
import { HTTPTransport } from '../index';
import { BASE_URL } from '../baseURL';

describe('HTTPTransport', () => {
  let xhr: sinon.SinonFakeXMLHttpRequestStatic;
  let requests: sinon.SinonFakeXMLHttpRequest[] = [];
  let http: HTTPTransport;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];

    xhr.onCreate = function (req) {
      requests.push(req);
    };

    http = new HTTPTransport();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('get()', () => {
    it('должен отправлять GET-запрос с правильным URL', async () => {
      const promise = http.get('/test', { data: { foo: 'bar' } });

      expect(requests.length).to.equal(1);
      const request = requests[0];

      expect(request.method).to.equal('GET');
      expect(request.url).to.equal(`${BASE_URL}/test?foo=bar`);

      request.respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ success: true }));
      const response = await promise;

      expect(response).to.deep.equal({ success: true });
    });
  });

  describe('post()', () => {
    it('должен отправлять POST-запрос с данными', async () => {
      const promise = http.post('/test', {
        headers: { 'Content-Type': 'application/json' },
        data: { foo: 'bar' },
      });

      expect(requests.length).to.equal(1);
      const request = requests[0];

      expect(request.method).to.equal('POST');

      expect(request.requestHeaders['Content-Type'].startsWith('application/json')).to.be.true;

      expect(request.requestBody).to.equal(JSON.stringify({ foo: 'bar' }));

      request.respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ result: 'ok' }));
      const response = await promise;

      expect(response).to.deep.equal({ result: 'ok' });
    });
  });

  describe('put()', () => {
    it('должен отправлять PUT-запрос', async () => {
      const promise = http.put('/put-endpoint', {
        data: { name: 'test' },
      });

      expect(requests.length).to.equal(1);
      expect(requests[0].method).to.equal('PUT');

      requests[0].respond(200, {}, JSON.stringify({ updated: true }));
      const response = await promise;

      expect(response).to.deep.equal({ updated: true });
    });
  });

  describe('delete()', () => {
    it('должен отправлять DELETE-запрос', async () => {
      const promise = http.delete('/delete-me');

      expect(requests.length).to.equal(1);
      expect(requests[0].method).to.equal('DELETE');

      requests[0].respond(200, {}, JSON.stringify({ deleted: true }));
      const response = await promise;

      expect(response).to.deep.equal({ deleted: true });
    });
  });

  describe('ошибки запроса', () => {
    it('должен обрабатывать ошибку сети', async () => {
      const promise = http.get('/fail');

      requests[0].error();

      try {
        await promise;
      } catch (err) {
        expect(err).to.be.instanceOf(Error);
        if (err instanceof Error) {
          expect(err.message).to.equal('Network error');
        } else {
          throw new Error('Ошибка не является экземпляром Error');
        }
      }
    });

    it('должен обрабатывать timeout', async () => {
      const promise = http.get('/timeout');

      (requests[0] as any).ontimeout?.();

      try {
        await promise;
      } catch (err) {
        expect(err).to.be.instanceOf(Error);
        if (err instanceof Error) {
          expect(err.message).to.equal('Request timeout');
        } else {
          throw new Error('Ошибка не является экземпляром Error');
        }
      }
    });

    it('должен обрабатывать abort', async () => {
      const promise = http.get('/abort');

      (requests[0] as any).onabort?.();

      try {
        await promise;
      } catch (err) {
        expect(err).to.be.instanceOf(Error);
        if (err instanceof Error) {
          expect(err.message).to.equal('Request aborted');
        } else {
          throw new Error('Ошибка не является экземпляром Error');
        }
      }
    });
  });
});
