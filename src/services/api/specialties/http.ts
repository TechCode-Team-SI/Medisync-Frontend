import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { formatLink, getPagination } from 'src/utils/utils';

import { url } from '../constants';
import { getLista, Specialty, WithPagination } from '../interface';

import {
  DisabledSpecialtyProps,
  PaginationWithSearch,
  PatchSpecialtyProps,
  PostSpecialtyProps,
  putAssignTemplateProps,
  putUserAgendaProps,
  SpecialtiesInterface,
} from './interface';

export class SpecialtiesHttp implements SpecialtiesInterface {
  async getMySpecialty(props: PaginationWithSearch) {
    try {
      const pagination = getPagination(props.page, props.limit);
      const link = formatLink(
        url + '/specialties',
        {},
        {
          ...pagination,
          search: props,
          filters: {
            search: props.search,
            isDisabled: props.isDisabled,
          },
        },
      );
      const data = await connectionHttp.get<getLista<Specialty>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async post(props: PostSpecialtyProps) {
    try {
      const data = await connectionHttp.post<Specialty>(url + '/specialties', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Specialties Failed', err.message));
      }
      return Promise.reject(new ServiceError('Specialty Error', 'error'));
    }
  }
  async get() {
    try {
      const link = formatLink(url + '/specialties', {});
      const data = await connectionHttp.get<getLista<Specialty>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Specialties Failed', err.message));
      }
      return Promise.reject(new ServiceError('Specialty Error', 'error'));
    }
  }
  async getActive(props: WithPagination) {
    try {
      const pagination = getPagination(props.page);
      const link = formatLink(url + '/specialties/active/private', {}, pagination);
      const data = await connectionHttp.get<getLista<Specialty>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Specialties Failed', err.message));
      }
      return Promise.reject(new ServiceError('Specialty Error', 'error'));
    }
  }

  async getDisable({ disable }: { disable: string }) {
    try {
      const link = formatLink(url + '/specialties', {}, { filters: { isDisabled: disable } });
      const data = await connectionHttp.get<getLista<Specialty>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Login Failed', err.message));
      }
      return Promise.reject(new ServiceError('Login Error', 'error'));
    }
  }

  async getById({ id }: { id: string }) {
    try {
      const link = formatLink(url + '/specialties/:id', { id });
      const data = await connectionHttp.get<Specialty>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Specialties Failed', err.message));
      }
      return Promise.reject(new ServiceError('Specialty Error', 'error'));
    }
  }
  async patch(props: PatchSpecialtyProps) {
    try {
      const data = await connectionHttp.patch<Specialty>(
        url + '/specialties/' + props.id,
        { name: props.name, description: props.description, image: props.image?.id ? props.image : null },
        getToken(),
      );
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Specialties Failed', err.message));
      }
      return Promise.reject(new ServiceError('Specialty Error', 'error'));
    }
  }
  async disabled(props: DisabledSpecialtyProps) {
    try {
      const data = await connectionHttp.patch<Specialty>(
        url + '/specialties/' + props.id,
        { isDisabled: props.isDisabled },
        getToken(),
      );
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Specialties Failed', err.message));
      }
      return Promise.reject(new ServiceError('Specialty Error', 'error'));
    }
  }
  async putAssignTemplate(props: putAssignTemplateProps) {
    try {
      const link = formatLink(url + '/specialties/request-template', {});
      const data = await connectionHttp.put<Specialty>(
        link,
        { id: props.id, requestTemplateId: props.templateId },
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
  async putAssignAgendaSpecialty(props: putUserAgendaProps) {
    try {
      const data = await connectionHttp.put<Specialty>(url + '/specialties/agenda', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
}
