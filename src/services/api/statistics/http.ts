import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { formatLink, getDates, getPagination } from 'src/utils/utils';

import { url } from '../constants';
import { getLista } from '../interface';

import {
  dayTop,
  elementTopSpecialty,
  elementTopMedic,
  modelStatistics,
  propsStatus,
  propsQuestions,
  propsFieldQuestions,
  propsSpecialtiesFilter,
  propsCreateStatisticData,
  Metadata,
  statisticsGraph,
  elementDiagnosis,
  propsStatus2,
} from './interface';

export class Statistics implements modelStatistics {
  async getTopElementDiagnosis(props: propsStatus2) {
    try {
      const date = getDates(props.time, props.date);
      const link = formatLink(
        url + '/statistics/top-:label',
        { label: props.label },
        {
          to: date.end,
          from: date.start,
        },
      );
      const data = await connectionHttp.get<elementDiagnosis[]>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async getTopMedics(props: propsStatus) {
    try {
      const date = getDates(props.time, props.date);
      const link = formatLink(
        url + '/statistics/top-medics',
        {},
        {
          to: date.end,
          from: date.start,
        },
      );
      const data = await connectionHttp.get<elementTopMedic[]>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async getTopSpecialties(props: propsStatus) {
    try {
      const date = getDates(props.time, props.date);
      const link = formatLink(
        url + '/statistics/top-specialties',
        {},
        {
          to: date.end,
          from: date.start,
        },
      );
      const data = await connectionHttp.get<elementTopSpecialty[]>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async getTopWeekdays(props: propsStatus) {
    try {
      const date = getDates(props.time, props.date);
      const link = formatLink(
        url + '/statistics/top-weekdays',
        {},
        {
          to: date.end,
          from: date.start,
        },
      );
      const data = await connectionHttp.get<dayTop[]>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }

  async getFieldQuestions(props: propsQuestions) {
    try {
      const pagination = getPagination(props.page, props.limit);
      const link = formatLink(
        url + '/statistics-metadata/field-questions',
        {},
        {
          ...pagination,
          filters: {
            type: props.type,
          },
        },
      );
      const data = await connectionHttp.get<getLista<propsFieldQuestions>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async getAvailableSpecialtiesFilter({ id }: { id: string }) {
    try {
      const link = formatLink(url + '/statistics-metadata/specialties/:id', { id });
      const data = await connectionHttp.get<getLista<propsSpecialtiesFilter>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async getStatistics() {
    try {
      const link = formatLink(url + '/statistics', {});
      const data = await connectionHttp.get<statisticsGraph>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async postCreateStatisticData(props: propsCreateStatisticData) {
    try {
      const link = formatLink(url + '/statistics-metadata', {});
      const data = await connectionHttp.post<Metadata>(link, props, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
}
