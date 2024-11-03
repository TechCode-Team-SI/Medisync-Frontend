import { Area, getLista } from '../interface';

export interface postAreaProps {
  name: string;
  address: string;
  specialty: { id: string };
}

export interface patchAreaProps {
  id: string;
  name: string;
  address: string;
  specialty: { id: string };
}

export abstract class Rooms {
  abstract getArea: (token: string) => Promise<getLista<Area>>;
  abstract postArea: (data: postAreaProps) => Promise<Area>;
  abstract patchArea: (data: patchAreaProps) => Promise<Area>;
}
