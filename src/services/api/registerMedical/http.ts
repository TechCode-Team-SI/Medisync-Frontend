import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { url } from '../constants';
import { getLista, User } from '../interface';

import { MedicalStaff, postUserProps, UserProps } from './interface';

export class RegisterMedical implements MedicalStaff {
  async getListMedicalStaff() {
    try {
      const data = await connectionHttp.get<getLista<User>>(
        url + '/users?limit=10&filters[onlyEmployee]=true',
        getToken(),
      );
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async getListMedicalStaffById(id: string) {
    try {
      const data = await connectionHttp.get<User>(url + '/users/' + id, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async postMedicalStaff(props: postUserProps) {
    try {
      const data = await connectionHttp.post<User>(url + '/users', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async pachtMedicalStaff(props: UserProps) {
    try {
      const data = await connectionHttp.patch<User>(url + '/users/' + props.id, props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
}
