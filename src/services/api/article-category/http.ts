import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { formatLink, getPagination } from 'src/utils/utils';

import { url } from '../constants';
import { getLista, ArticleCategory } from '../interface';

import {
  getArticleCategoryProps,
  modelArticleCategory,
  pachtArticleCategoryprops,
  postArticleCategoryprops,
} from './interface';

export class ArticleCategories implements modelArticleCategory {
  async getArticleCategory(props?: getArticleCategoryProps) {
    try {
      const pagination = getPagination(props?.page);
      const link = formatLink(url + '/article-categories', {}, { filters: { search: props?.search }, ...pagination });
      const data = await connectionHttp.get<getLista<ArticleCategory>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async postArticleCategory(props: postArticleCategoryprops) {
    try {
      const data = await connectionHttp.post<ArticleCategory>(url + '/article-categories', props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async patchArticleCategory(props: pachtArticleCategoryprops) {
    try {
      const data = await connectionHttp.patch<ArticleCategory>(
        url + '/article-categories/' + props.id,
        props,
        getToken(),
      );
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
  async deleteArticleCategory(props: pachtArticleCategoryprops) {
    try {
      const data = await connectionHttp.delete<ArticleCategory>(url + '/article-categories/' + props.id, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Create Failed', err.message));
      }
      return Promise.reject(new ServiceError('Create Error', 'error'));
    }
  }
}
