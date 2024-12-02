import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { formatLink, getPagination } from 'src/utils/utils';

import { url } from '../constants';
import { getLista, Pathology, WithSearch } from '../interface';

import { modelPathology, PaginationWithSearch, Pathologyprops, postPathologyprops } from './interface';

export class Pathologies implements modelPathology {
  async getMyPathology(props: PaginationWithSearch) {
    try {
      const pagination = getPagination(props.page, props.limit);
      const link = formatLink(
        url + '/pathologies',
        {},
        {
          ...pagination,
          search: props,
          filters: {
            search: props.search,
          },
        },
      );
      const data = await connectionHttp.get<getLista<Pathology>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }

  async getPathology(props: WithSearch) {
    try {
      const pagination = getPagination('1', '100');
      const link = formatLink(url + '/pathologies', {}, { search: props.search, ...pagination });
      const data = await connectionHttp.get<getLista<Pathology>>(link, getToken());
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
