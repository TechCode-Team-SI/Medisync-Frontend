import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { formatLink, getPagination } from 'src/utils/utils';

import { url } from '../constants';
import { getLista, TicketType } from '../interface';

import { getTicketTypeProps, modelTicketType, pachtTicketTypeprops, postTicketTypeprops } from './interface';

export class TicketTypes implements modelTicketType {
  async getTicketType(props?: getTicketTypeProps) {
    try {
      const pagination = getPagination(props?.page);
      const link = formatLink(url + '/ticket-types', {}, { filters: { search: props?.search }, ...pagination });
      const data = await connectionHttp.get<getLista<TicketType>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async postTicketType(props: postTicketTypeprops) {
    try {
      const data = await connectionHttp.post<TicketType>(url + '/ticket-types', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async patchTicketType(props: pachtTicketTypeprops) {
    try {
      const data = await connectionHttp.patch<TicketType>(url + '/ticket-types/' + props.id, props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async deleteTicketType(props: pachtTicketTypeprops) {
    try {
      const data = await connectionHttp.delete<TicketType>(url + '/ticket-types/' + props.id, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
}
