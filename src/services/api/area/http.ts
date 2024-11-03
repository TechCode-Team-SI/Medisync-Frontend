import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { url } from '../constants';
import { getLista, Area } from '../interface';

import { patchAreaProps, postAreaProps, Rooms } from './interface';

export class modelArea implements Rooms {
  async getArea() {
    try {
      const data = await connectionHttp.get<getLista<Area>>(url + '/rooms', getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Failed', err.message));
      }
      return Promise.reject(new ServiceError('Error', 'error'));
    }
  }

  async postArea(props: postAreaProps): Promise<Area> {
    try {
      const data = await connectionHttp.post<Area>(
        url + '/rooms',
        {
          name: props.name,
          address: props.address,
          specialty: props.specialty,
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

  async patchArea(props: patchAreaProps): Promise<Area> {
    try {
      const data = await connectionHttp.patch<Area>(
        url + '/rooms/' + props.id,
        { name: props.name, address: props.address, specialty: props.specialty },
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
}
