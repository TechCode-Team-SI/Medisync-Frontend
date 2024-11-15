import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { formatLink } from 'src/utils/utils';

import { url } from '../constants';
import { getLista, Specialty } from '../interface';

import {
  DisabledSpecialtyProps,
  PatchSpecialtyProps,
  PostSpecialtyProps,
  putAssignTemplateProps,
  SpecialtiesInterface,
} from './interface';

export class SpecialtiesHttp implements SpecialtiesInterface {
  async post(props: PostSpecialtyProps) {
    try {
      const data = await connectionHttp.post<Specialty>(url + '/specialties', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Login Failed', err.message));
      }
      return Promise.reject(new ServiceError('Login Error', 'error'));
    }
  }
  async get() {
    try {
      const data = await connectionHttp.get<getLista<Specialty>>(url + '/specialties', getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Login Failed', err.message));
      }
      return Promise.reject(new ServiceError('Login Error', 'error'));
    }
  }
  async getById(id: string) {
    try {
      const data = await connectionHttp.get<Specialty>(url + '/specialties/' + id, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Login Failed', err.message));
      }
      return Promise.reject(new ServiceError('Login Error', 'error'));
    }
  }
  async patch(props: PatchSpecialtyProps) {
    try {
      const data = await connectionHttp.patch<Specialty>(
        url + '/specialties/' + props.id,
        { name: props.name, description: props.description },
        getToken(),
      );
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Login Failed', err.message));
      }
      return Promise.reject(new ServiceError('Login Error', 'error'));
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
        return Promise.reject(new ServiceError('Login Failed', err.message));
      }
      return Promise.reject(new ServiceError('Login Error', 'error'));
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
}
