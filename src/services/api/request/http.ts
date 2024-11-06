import { endOfDay, startOfDay } from 'date-fns';

import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { formatLink, getPagination } from 'src/utils/utils';

import { url } from '../constants';
import { getLista, Requests } from '../interface';

import { modelRequests, RequestsProps } from './interface';

export class Request implements modelRequests {
  async getMyRequests(props: RequestsProps) {
    let dateParams = {};
    if (props.today) {
      dateParams = {
        from: startOfDay(new Date()).toISOString(),
        to: endOfDay(new Date()).toISOString(),
      };
    }
    if (props.startDate) {
      dateParams = {
        ...dateParams,
        from: props.startDate.toISOString(),
      };
    }
    if (props.endDate) {
      dateParams = {
        ...dateParams,
        to: props.endDate.toISOString(),
      };
    }
    try {
      const pagination = getPagination(props.page, props.limit);
      const link = formatLink(
        url + '/requests/for-me',
        {},
        {
          ...pagination,
          search: props.search,
          filters: {
            status: props.status,
            search: props.search,
            ...dateParams,
          },
          sortBy: {
            field: 'appointmentDate',
            order: 'DESC',
          },
        },
      );
      const data = await connectionHttp.get<getLista<Requests>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }

  async attendRequest({ id }: { id: string }) {
    try {
      const link = formatLink(url + '/requests/attend/:id', { id });
      const data = await connectionHttp.post<Requests>(link, {}, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
}
