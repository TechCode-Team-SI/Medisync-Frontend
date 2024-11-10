import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { formatLink } from 'src/utils/utils';

import { url } from '../constants';
import { Disease, getLista } from '../interface';

import { getDiseaseProps, modelDiseases, pachtDiseaseprops, postDiseaseprops } from './interface';

export class Diseases implements modelDiseases {
  async getDisease(props?: getDiseaseProps) {
    try {
      const link = formatLink(url + '/illnesses', {}, { search: props?.search });
      const data = await connectionHttp.get<getLista<Disease>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async postDisease(props: postDiseaseprops) {
    try {
      const data = await connectionHttp.post<Disease>(url + '/illnesses', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async patchDisease(props: pachtDiseaseprops) {
    try {
      const data = await connectionHttp.patch<Disease>(url + '/illnesses/' + props.id, props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async deleteDisease(props: pachtDiseaseprops) {
    try {
      const data = await connectionHttp.delete<Disease>(url + '/illnesses/' + props.id, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
}
