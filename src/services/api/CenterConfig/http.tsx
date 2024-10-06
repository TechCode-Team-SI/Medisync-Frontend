import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';

import { token, url } from '../constants';
import { Installation } from '../interface';

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
}
