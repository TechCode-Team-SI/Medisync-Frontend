import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { url } from '../constants';
import { getLista, Pathology } from '../interface';

import { modelPathology, Pathologyprops, postPathologyprops } from './interface';

export class Pathologies implements modelPathology {
  async getPathology() {
    try {
      const data = await connectionHttp.get<getLista<Pathology>>(url + '/pathologies', getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async postPathology(props: postPathologyprops) {
    try {
      const data = await connectionHttp.post<Pathology>(url + '/pathologies', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async patchPathology(props: Pathologyprops) {
    try {
      const data = await connectionHttp.patch<Pathology>(url + '/pathologies/' + props.id, props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async deletePathology(props: Pathologyprops) {
    try {
      const data = await connectionHttp.delete<Pathology>(url + '/pathologies/' + props.id, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
}