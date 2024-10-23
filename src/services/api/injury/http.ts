import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { url } from '../constants';
import { getLista, Injury } from '../interface';

import { modelInjury, pachtInjuryprops, postInjuryprops } from './interface';

export class Injurys implements modelInjury {
  async getInjury() {
    try {
      const data = await connectionHttp.get<getLista<Injury>>(url + '/injuries', getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async postInjury(props: postInjuryprops) {
    try {
      const data = await connectionHttp.post<Injury>(url + '/injuries', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async patchInjury(props: pachtInjuryprops) {
    try {
      const data = await connectionHttp.patch<Injury>(url + '/injuries/' + props.id, props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async deleteInjury(props: pachtInjuryprops) {
    try {
      const data = await connectionHttp.delete<Injury>(url + '/injuries/' + props.id, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
}
