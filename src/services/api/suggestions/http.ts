import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { url } from '../constants';
import { Suggestion, getLista } from '../interface';

import { modelSuggestions } from './interface';

export class Suggestions implements modelSuggestions {
  async getSugestion() {
    try {
      const data = await connectionHttp.get<getLista<Suggestion>>(url + '/tickets/suggestion', getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
}
