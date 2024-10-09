import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';

import { token, url } from '../constants';
import { UserAdmin } from '../interface';

import { CreateFirstUser, firstUserProps } from './interface';

export class Installation implements CreateFirstUser {
  async FirstUser(props: firstUserProps) {
    try {
      const data = await connectionHttp.post<UserAdmin>(url + '/installation/one', props, '', { token });
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create admin user Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create admin user Failed', 'error'));
    }
  }
}
