import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { ChartTypeEnum } from 'src/utils/constants';
import { formatLink, getDates, getPagination } from 'src/utils/utils';

import { url } from '../constants';
import { getLista } from '../interface';

import {
  modelStatistics,
  propsQuestions,
  propsFieldQuestions,
  propsSpecialtiesFilter,
  propsCreateStatisticData,
  Metadata,
  Chart,
  elementTop,
  propsStatisticsTop,
  statisticsTopParams,
} from './interface';

export class Statistics implements modelStatistics {
  async getTopStatistics(props: propsStatisticsTop) {
    try {
      const date = getDates(props.time, props.date);

      const params: statisticsTopParams = {
        to: date.end,
        from: date.start,
      };

      if (props.specialtyId) {
        params.specialtyId = props.specialtyId;
      }

      if (props.gender) {
        params.gender = props.gender;
      }

      if (props.ageFrom || props.ageTo) {
        params.ageFrom = props.ageFrom ?? 0;
        params.ageTo = props.ageTo ?? 99;
      }

      if (props.grouping) {
        params.grouping = props.grouping;
      }

      if (props.filterByMe) {
        params.filterByMe = props.filterByMe;
      }

      const link = formatLink(url + '/statistics/top-:label', { label: props.label || '' }, params);

      const data = await connectionHttp.get<elementTop[]>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }

  async getTopStatisticsChart(props: propsStatisticsTop, chartType: ChartTypeEnum) {
    try {
      const top = await this.getTopStatistics(props);

      const data = top.map((data) => ({
        category: data.name,
        value: data.requests,
      }));

      const title = '';
      const description = '';

      const chartData: Chart[] = [];

      chartData.push({
        type: chartType,
        title,
        description,
        data,
      });

      return chartData;
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

  async getAllAvailableSpecialties() {
    try {
      const link = formatLink(url + '/statistics-metadata/all-specialties', {});
      const data = await connectionHttp.get<getLista<propsSpecialtiesFilter>>(link, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }
  async getStatistics(props?: string) {
    try {
      const link = formatLink(url + '/statistics', {}, { filterByMe: props ?? undefined });
      const data = await connectionHttp.get<Chart[]>(link, getToken());
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
