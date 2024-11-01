import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { token, url } from '../constants';
import { Installation, MedicalCenter } from '../interface';

import { centerConfigInterface, postCenterConifgProps } from './interface';

export class CenterConfigHttp implements centerConfigInterface {
  async post(props: postCenterConifgProps) {
    try {
      const data = await connectionHttp.post<Installation>(url + '/installation/three', props, '', { token });
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async patch(props: postCenterConifgProps) {
    try {
      const data = await connectionHttp.patch<MedicalCenter>(url + '/medical-centers', props, getToken());
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
      const data = await connectionHttp.get<MedicalCenter>(url + '/medical-centers', getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Get Data Failed', err.message));
      }
      return Promise.reject(new ServiceError('Get Data Error', 'error'));
    }
  }
}
