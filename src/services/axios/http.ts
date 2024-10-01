import axios, { AxiosError, AxiosInstance } from 'axios';

import { HTTPError, httpErrorProps } from '../errors/HTTPErrors';

import { Connection } from './interface';

export class ConnectionHttp implements Connection {
  token: string;
  private _client: AxiosInstance;

  constructor() {
    this.token = '';
    this._client = axios.create();
  }

  async get<T>(url: string, token: string) {
    try {
      const headers = { Authorization: `Bearer  ${token}` };
      const resp = await this._client.get<T>(url, { headers });
      return resp.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return Promise.reject(new HTTPError(err.response?.data?.error as httpErrorProps));
      }
      return Promise.reject(err);
    }
  }
  async post<T>(url: string, body: object, token: string) {
    try {
      const headers = { Authorization: `Bearer  ${token}` };
      const resp = await this._client.post<T>(url, body, { headers });
      return resp.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return Promise.reject(new HTTPError(err.response?.data?.error as httpErrorProps));
      }
      return Promise.reject(err);
    }
  }
  async put<T>(url: string, body: object, token: string) {
    try {
      const headers = { Authorization: `Bearer  ${token}` };
      const resp = await this._client.put<T>(url, body, { headers });
      return resp.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return Promise.reject(new HTTPError(err.response?.data?.error as httpErrorProps));
      }
      return Promise.reject(err);
    }
  }
  async delete<T>(url: string, token: string) {
    try {
      const headers = { Authorization: `Bearer  ${token}` };
      const resp = await this._client.delete<T>(url, { headers });
      return resp.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return Promise.reject(new HTTPError(err.response?.data?.error as httpErrorProps));
      }
      return Promise.reject(err);
    }
  }
}
