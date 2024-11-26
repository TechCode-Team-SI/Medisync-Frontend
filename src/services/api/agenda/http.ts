import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { formatLink, getPagination } from 'src/utils/utils';

import { url } from '../constants';
import { Agenda, getLista, WithPagination } from '../interface';

import {
  agendaProps,
  Agendas,
  GetAgendaByEntityProps,
  GetDaysOffsProps,
  PaginationWithSearch,
  patchAgendaProps,
} from './interface';

export class modelAgenda implements Agendas {
  async getMyAgenda(props: PaginationWithSearch) {
    try {
      const pagination = getPagination(props.page, props.limit);
      const link = formatLink(
        url + '/agendas',
        {},
        {
          ...pagination,
          search: props,
          filters: {
            search: props.search,
          },
        },
      );
      const data = await connectionHttp.get<getLista<Agenda>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async getAgenda() {
    try {
      const data = await connectionHttp.get<getLista<Agenda>>(url + '/agendas', getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async getAgendaByEntity(props: GetAgendaByEntityProps & WithPagination) {
    try {
      const { page, limit } = props;
      const pagination = getPagination(page, limit);
      const link = formatLink(
        `${url}/agendas/:type/:entityId`,
        { type: props.type, entityId: props.entityId },
        pagination,
      );
      const data = await connectionHttp.get<Agenda>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async getTimeSlotted(props: GetAgendaByEntityProps) {
    try {
      const link = formatLink(`${url}/agendas/slot/:type/:entityId`, props);
      const data = await connectionHttp.get<string[]>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async getDaysOffs(props: GetDaysOffsProps) {
    try {
      const link = formatLink(`${url}/days-offs/ranged`, {}, props);
      const data = await connectionHttp.get<string[]>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async postAgenda(props: agendaProps) {
    try {
      const data = await connectionHttp.post<Agenda>(url + '/agendas', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async patchAgenda(props: patchAgendaProps) {
    try {
      const data = await connectionHttp.patch<Agenda>(url + '/agendas/' + props.id, props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
}
