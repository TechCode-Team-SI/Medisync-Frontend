import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { FieldQuestionTypeEnum } from 'src/utils/constants';
import { formatLink, getPagination, urlQueryBuilder } from 'src/utils/utils';

import { url } from '../constants';
import { getLista, FieldQuestion } from '../interface';

import { getFieldQuestionProps, modelFieldQuestion, PaginationWithSearch, postFieldQuestionprops } from './interface';

export class FieldQuestions implements modelFieldQuestion {
  async getMyFieldQuestion(props: PaginationWithSearch) {
    try {
      const pagination = getPagination(props.page, props.limit);
      const link = formatLink(
        url + '/field-questions',
        {},
        {
          ...pagination,
          search: props,
          filters: {
            search: props.search,
          },
        },
      );
      const data = await connectionHttp.get<getLista<FieldQuestion>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async getFieldQuestion(props: getFieldQuestionProps) {
    try {
      const query = urlQueryBuilder({
        filters: {
          search: props.search === '' ? undefined : props.search,
        },
      });
      const data = await connectionHttp.get<getLista<FieldQuestion>>(url + '/field-questions' + query, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async deleteFieldQuestion(id: string) {
    try {
      const data = await connectionHttp.delete<getLista<FieldQuestion>>(url + '/field-questions/' + id, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async postFieldQuestion(props: postFieldQuestionprops) {
    let link = url + '/field-questions';
    try {
      if (props.type === FieldQuestionTypeEnum.SELECTION) {
        link += '/selection';
      } else {
        link += '/textfield';
      }
      const data = await connectionHttp.post<FieldQuestion>(link, props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
}
