import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';

import { url } from '../constants';
import { Session } from '../interface';

import { AuthLogin, loginProps } from './interface';

export class Login implements AuthLogin {
  async login(props: loginProps) {
    try {
      const data = await connectionHttp.post<Session>(url.login, props, '');
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Login Failed', err.message));
      }
      return Promise.reject(new ServiceError('Login Error', 'error'));
    }
  }
}
