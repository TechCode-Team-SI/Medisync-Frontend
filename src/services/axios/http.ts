import axios, { AxiosError, AxiosInstance } from 'axios';

import { SystemMetadata } from 'src/@types/types';
import { paths } from 'src/paths';

import { HTTPError, httpErrorProps } from '../errors/HTTPErrors';
import { SystemMetadataHandler } from '../renderer/systemMetadataHandler';

import { Connection } from './interface';

export class ConnectionHttp implements Connection {
  token: string;
  private _client: AxiosInstance;

  constructor() {
    this.token = '';
    this._client = axios.create();
    this._client.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error: AxiosError<{ message: string; error: string }>) {
        console.log(error.response?.data);
        if (error.response?.data?.error === 'system_not_installed') {
          const metadata: SystemMetadata = { IS_INSTALLED: false };
          const result = await SystemMetadataHandler.saveSystemMetadata(metadata);
          console.log(result);
          window.location.replace(paths.start);
        }
        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, token: string, option?: { token: string }) {
    try {
      let headers: object = { Authorization: `Bearer  ${token}` };
      if (option) {
        headers = { ...headers, token: option?.token };
      }
      const resp = await this._client.get<T>(url, { headers });
      return resp.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return Promise.reject(new HTTPError(err.response?.data as httpErrorProps));
      }
      return Promise.reject(err);
    }
  }
  async post<T>(url: string, body: object, token: string, option?: { token: string }) {
    try {
      let headers: object = { Authorization: `Bearer  ${token}` };
      if (option) {
        headers = { ...headers, token: option?.token };
      }
      const resp = await this._client.post<T>(url, body, { headers });
      return resp.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return Promise.reject(new HTTPError(err.response?.data as httpErrorProps));
      }
      return Promise.reject(err);
    }
  }
  async patch<T>(url: string, body: object, token: string) {
    try {
      const headers = { Authorization: `Bearer  ${token}` };
      const resp = await this._client.patch<T>(url, body, { headers });
      return resp.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return Promise.reject(new HTTPError(err.response?.data as httpErrorProps));
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
        return Promise.reject(new HTTPError(err.response?.data as httpErrorProps));
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
        return Promise.reject(new HTTPError(err.response?.data as httpErrorProps));
      }
      return Promise.reject(err);
    }
  }
}
