import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { url } from '../constants';
import { getLista, User } from '../interface';

import { getbyIdUserProps, postUserProps, putUserProps, userInterface } from './interface';

export class UserHttp implements userInterface {
  async post(props: postUserProps) {
    const dataOrdered = {
      email: props.email,
      password: props.password,
      fullName: props.fullName,
      employeeProfile: {
        address: props.employeeProfile.address,
        birthday: props.employeeProfile.birthday,
        dni: props.employeeProfile.dni,
        CML: props.employeeProfile.CML,
        MPPS: props.employeeProfile.MPPS,
        gender: props.employeeProfile.gender,
      },
    };
    try {
      const data = await connectionHttp.post<User>(url + '/users', dataOrdered, getToken());
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
      const data = await connectionHttp.get<getLista<User>>(url + '/users?limit=10', getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async getbyID(props: getbyIdUserProps) {
    try {
      const data = await connectionHttp.get<User>(url + '/users/' + props.id, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async putassignrole(props: putUserProps) {
    try {
      const data = await connectionHttp.put<User>(url + '/users/roles', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
}
