import qs from 'qs';

import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { url } from '../constants';
import { getLista, Ticket } from '../interface';

import { getTicketProps, modelTicket, pachtTicketprops, postTicketprops } from './interface';

export class Tickets implements modelTicket {
  async getTicket(props: getTicketProps) {
    try {
      const query = qs.stringify(
        {
          filters: {
            type: props.type,
            status: props.status,
          },
        },
        { addQueryPrefix: true },
      );
      const data = await connectionHttp.get<getLista<Ticket>>(url + '/tickets' + query, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async postTicket(props: postTicketprops) {
    try {
      const data = await connectionHttp.post<Ticket>(url + '/tickets', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async patchTicket(props: pachtTicketprops) {
    try {
      const data = await connectionHttp.patch<Ticket>(url + '/tickets/' + props.id, props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async deleteTicket(props: pachtTicketprops) {
    try {
      const data = await connectionHttp.delete<Ticket>(url + '/tickets/' + props.id, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
}
