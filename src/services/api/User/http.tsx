import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { url } from '../constants';
import { getLista, User } from '../interface';

import { postUserProps, userInterface } from './interface';

export class UserHttp implements userInterface {
  async post(props: postUserProps, token: string) {
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
      const data = await connectionHttp.post<User>(url + '/users', dataOrdered, token);
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
      console.log(getToken());
      const data = await connectionHttp.get<getLista<User>>(url + '/users?limit=10', getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
}
