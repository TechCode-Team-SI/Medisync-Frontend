import { Area, getLista } from '../interface';

export abstract class Rooms {
  abstract getArea: (token: string) => Promise<getLista<Area>>;
}
