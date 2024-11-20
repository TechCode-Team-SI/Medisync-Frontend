import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { formatLink } from 'src/utils/utils';

import { url } from '../constants';
import { Claim, getLista } from '../interface';

import { modelTickets, TicketChatMessage } from './interface';

export class Tickets implements modelTickets {
  async getTicketComplaint({ id }: { id: string }) {
    try {
      const link = formatLink(url + '/tickets/comments/:id', { id });
      const data = await connectionHttp.get<getLista<Claim>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async postTicket(props: TicketChatMessage) {
    try {
      const data = await connectionHttp.post<any>(url + '/tickets/comments/' + props.id, props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
}
