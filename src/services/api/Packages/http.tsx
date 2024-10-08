import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { token, url } from '../constants';
import { getLista, Packages } from '../interface';

import { packageInterface, postPackageProps } from './interface';

export class PackageHttp implements packageInterface {
  async postInstallation(props: postPackageProps) {
    try {
      const data = await connectionHttp.post<Packages>(url + '/installation/two', props, '', { token });
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async post(props: postPackageProps) {
    try {
      const data = await connectionHttp.post<Packages>(url + '/packages', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async getInstallation() {
    try {
      const data = await connectionHttp.get<getLista<Packages>>(url + '/installation/packages', '', { token });
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async get() {
    try {
      const data = await connectionHttp.get<getLista<Packages>>(url + '/packages', getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
}
