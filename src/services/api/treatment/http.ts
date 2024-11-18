import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { formatLink } from 'src/utils/utils';

import { url } from '../constants';
import { getLista, Treatment } from '../interface';

import { getTreatmentProps, modelTreatment, postTreatmentprops, Treatmentprops } from './interface';

export class Treatments implements modelTreatment {
  async getTreatment(props: getTreatmentProps) {
    try {
      const link = formatLink(url + '/treatments', {}, { search: props.search });
      const data = await connectionHttp.get<getLista<Treatment>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async postTreatment(props: postTreatmentprops) {
    try {
      const data = await connectionHttp.post<Treatment>(url + '/treatments', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async patchTreatment(props: Treatmentprops) {
    try {
      const data = await connectionHttp.patch<Treatment>(url + '/treatments/' + props.id, props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async deleteTreatment(props: Treatmentprops) {
    try {
      const data = await connectionHttp.delete<Treatment>(url + '/treatments/' + props.id, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
}
