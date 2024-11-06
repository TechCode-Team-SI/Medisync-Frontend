import { Requests, getLista } from '../interface';

export abstract class modelRequests {
  abstract getRequests: () => Promise<getLista<Requests>>;
}
