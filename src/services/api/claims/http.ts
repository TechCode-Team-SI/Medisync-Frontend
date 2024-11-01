import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { url } from '../constants';
import { Claim, getLista } from '../interface';

import { modelClaims } from './interface';

export class Claims implements modelClaims {
  async getClaim() {
    try {
      const data = await connectionHttp.get<getLista<Claim>>(url + '/tickets/complaint', getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
}
