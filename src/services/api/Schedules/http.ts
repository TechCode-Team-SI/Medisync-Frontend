import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { url } from '../constants';
import { getLista, Schedules } from '../interface';

import { postScheduleProps, Schedule } from './interface';

export class modelSchedules implements Schedule {
  async getSchedule() {
    try {
      const data = await connectionHttp.get<getLista<Schedules>>(url + '/schedules', getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }

  async postSchedule(props: postScheduleProps): Promise<Schedules> {
    try {
      const data = await connectionHttp.post<Schedules>(
        url + '/schedules',
        {
          name: props.name,
          from: props.start,
          to: props.end,
        },
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
}
