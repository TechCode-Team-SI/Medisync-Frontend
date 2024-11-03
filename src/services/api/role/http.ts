import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { url } from '../constants';
import { getLista, Role } from '../interface';

import { Rol, porpsRole, patchPorpsRole } from './interface';

export class Roles implements Rol {
  async getRoles() {
    try {
      const data = await connectionHttp.get<getLista<Role>>(url + '/roles', getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async postRoles(props: porpsRole) {
    try {
      const data = await connectionHttp.post<Role>(url + '/roles', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async patchRoles(props: patchPorpsRole) {
    try {
      const data = await connectionHttp.patch<Role>(url + '/roles/' + props.id, props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async deleteRoles(props: patchPorpsRole) {
    try {
      const data = await connectionHttp.delete<Role>(url + '/roles/' + props.id, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
}
