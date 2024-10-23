import { connectionHttp } from 'src/services/axios';
import { HTTPError } from 'src/services/errors/HTTPErrors';
import { ServiceError } from 'src/services/errors/ServiceErrors';
import { getToken } from 'src/store/sessionStore';

import { url } from '../constants';
import { Image } from '../interface';

import { FileUpload, fileProps } from './interface';

export class PostFileUpload implements FileUpload {
  async postFile(props: fileProps) {
    const datafile = new FormData();
    datafile.append('file', props.fileLoad);
    try {
      const data = await connectionHttp.post<Image>(url + '/files/upload', datafile, getToken());
      return data;
    } catch (err) {
      if (err instanceof HTTPError) {
        return Promise.reject(new ServiceError('Login Failed', err.message));
      }
      return Promise.reject(new ServiceError('Login Error', 'error'));
    }
  }
}
