import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { formatLink, getPagination } from 'src/utils/utils';

import { url } from '../constants';
import { getLista } from '../interface';

import { modelNotifications, propsalert, propsNotifications, Resp } from './interface';

export class Notifications implements modelNotifications {
  async getNotifications(props: propsalert) {
    try {
      const pagination = getPagination(props.page, props.limit);
      const link = formatLink(
        url + '/notifications/me',
        {},
        {
          ...pagination,
          filters: {
            type: props.type,
          },
        },
      );
      const data = await connectionHttp.get<getLista<propsNotifications>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async postReadMyNotifications({ id }: { id: string }) {
    try {
      const link = formatLink(url + '/notifications/me/read', {});
      const data = await connectionHttp.post<Resp>(link, { notificationUserIds: [id] }, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Specialties Failed', err.message));
      }
      return Promise.reject(new ServiceError('Specialty Error', 'error'));
    }
  }
}
