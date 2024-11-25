import { endOfDay, startOfDay } from 'date-fns';

import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { formatLink, getPagination } from 'src/utils/utils';

import { url } from '../constants';
import { getLista, RequestFormatted, Requests } from '../interface';

import { createRequestServiceProps, DiagnosticProps, modelRequests, RequestsProps } from './interface';

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
  async getRequestsCalendar(props: RequestsProps) {
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
        url + '/requests',
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
  async getRequests() {
    try {
      const link = formatLink(url + '/requests', {});
      const data = await connectionHttp.get<getLista<Requests>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }

  async getRequestsByID({ id }: { id: string }) {
    try {
      const link = formatLink(url + '/requests/:id', { id });
      const data = await connectionHttp.get<RequestFormatted>(link, getToken());
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

  async cancelRequest({ requestId }: { requestId: string }) {
    try {
      const link = formatLink(url + '/requests/medic/cancel/:requestId', { requestId });
      const data = await connectionHttp.post<Requests>(link, {}, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }

  async postAttendRequest(props: DiagnosticProps) {
    try {
      const link = formatLink(url + '/requests/finish/' + props.id, {});
      const data = await connectionHttp.post<Requests>(link, props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }

  async postCreatePrivateRequest(props: createRequestServiceProps) {
    try {
      const baseURL = url + `/requests/${props.referredContent ? 'reference' : 'private'}`;
      const link = formatLink(baseURL, {});
      const data = await connectionHttp.post<boolean>(
        link,
        {
          appointmentHour: props.appointmentHour,
          appointmentDate: props.appointmentDate,
          patientFullName: props.patientFullName,
          patientAddress: props.patientAddress,
          patientGender: props.patientGender,
          patientBirthday: props.patientBirthday.toISOString(),
          patientDNI: props.patientDNI,
          requestTemplate: {
            id: props.requestTemplateId,
          },
          requestedMedic: {
            id: props.medicId,
          },
          requestedSpecialty: {
            id: props.specialtyId,
          },
          requestValues: props.requestValues,
          referredContent: props.referredContent,
        },
        getToken(),
      );
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
}
