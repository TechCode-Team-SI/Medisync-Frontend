import { RequestStatusEnum } from 'src/utils/constants';

import { WithPagination, WithSearch, Requests, getLista } from '../interface';

export type RequestsProps = {
  startDate?: Date;
  endDate?: Date;
  status?: RequestStatusEnum;
} & WithPagination &
  WithSearch;

export abstract class modelRequests {
  abstract getMyRequests: (props: RequestsProps) => Promise<getLista<Requests>>;
  abstract getRequests: () => Promise<getLista<Requests>>;
  abstract attendRequest: (props: { id: string }) => Promise<Requests>;
}
