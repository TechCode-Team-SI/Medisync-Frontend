import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { url } from '../constants';

import { modelTickets, TicketChatMessage } from './interface';

export class Tickets implements modelTickets {
  // async getTicketComplaint() {
  //   try {
  //     const data = await connectionHttp.get<any>(url + '/tickets/complaint', getToken());
  //     return data;
  //   } catch (err) {
  //     if (err instanceof HTTPError) {
  //       return Promise.reject(new ServiceError('Create Failed', err.message));
  //     }
  //     return Promise.reject(new ServiceError('Create Error', 'error'));
  //   }
  // }
  async postTicket(props: TicketChatMessage) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
