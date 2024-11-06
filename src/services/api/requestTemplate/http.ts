import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { urlQueryBuilder } from 'src/utils/utils';

import { url } from '../constants';
import { getLista, RequestTemplate } from '../interface';

import { getRequestTemplateProps, modelRequestTemplate, postRequestTemplateprops } from './interface';

export class RequestTemplates implements modelRequestTemplate {
  async getRequestTemplate(props: getRequestTemplateProps) {
    try {
      const query = urlQueryBuilder({
        filters: {
          search: props.search === '' ? undefined : props.search,
        },
      });
      const data = await connectionHttp.get<getLista<RequestTemplate>>(url + '/request-templates' + query, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async postRequestTemplate(props: postRequestTemplateprops) {
    try {
      const data = await connectionHttp.post<RequestTemplate>(url + '/request-templates', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
}
