import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { formatLink } from 'src/utils/utils';

import { url } from '../constants';
import { getLista, User } from '../interface';

import {
  getbyIdUserProps,
  postUserProps,
  putShceduleUserProps,
  putUserAgendaProps,
  putUserRoleProps,
  userInterface,
} from './interface';

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
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async get() {
    try {
      const data = await connectionHttp.get<getLista<User>>(url + '/users?limit=10', getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async getEmployees() {
    try {
      const link = formatLink(url + '/users', {}, { filters: { onlyEmployee: 'true' } });
      const data = await connectionHttp.get<getLista<User>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async getbyID(props: getbyIdUserProps) {
    try {
      const data = await connectionHttp.get<User>(url + '/users/' + props.id, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async putAssignRole(props: putUserRoleProps) {
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
  async putassignschedule(props: putShceduleUserProps) {
    try {
      const data = await connectionHttp.put<User>(url + '/users/schedule', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async putAssignAgenda(props: putUserAgendaProps) {
    try {
      const data = await connectionHttp.put<User>(url + '/users/agenda', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
}
