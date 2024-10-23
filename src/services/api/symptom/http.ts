import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { url } from '../constants';
import { getLista, Symptoms } from '../interface';

import { modelSymptoms, Symptomsprops, postSymptomsprops } from './interface';

export class Symptom implements modelSymptoms {
  async getSymptoms() {
    try {
      const data = await connectionHttp.get<getLista<Symptoms>>(url + '/symptoms', getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async postSymptoms(props: postSymptomsprops) {
    try {
      const data = await connectionHttp.post<Symptoms>(url + '/symptoms', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async patchSymptoms(props: Symptomsprops) {
    try {
      const data = await connectionHttp.patch<Symptoms>(url + '/symptoms/' + props.id, props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async deleteSymptoms(props: Symptomsprops) {
    try {
      const data = await connectionHttp.delete<Symptoms>(url + '/symptoms/' + props.id, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
}
