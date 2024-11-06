import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { url } from '../constants';
import { getLista, Agenda } from '../interface';

import { agendaProps, Agendas, patchAgendaProps } from './interface';

export class modelAgenda implements Agendas {
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
