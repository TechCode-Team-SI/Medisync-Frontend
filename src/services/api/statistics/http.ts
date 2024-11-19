import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';
import { formatLink } from 'src/utils/utils';

import { url } from '../constants';

import { dayTop, elementTopSpecialty, elementTopMedic, modelStatistics, propsStatus } from './interface';

export class Statistics implements modelStatistics {
  async getTopMedics(props: propsStatus) {
    try {
      const link = formatLink(
        url + '/statistics/top-medics',
        {},
        {
          time: props.time,
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
      const link = formatLink(
        url + '/statistics/top-specialties',
        {},
        {
          time: props.time,
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
      const link = formatLink(
        url + '/statistics/top-weekdays',
        {},
        {
          time: props.time,
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
}
