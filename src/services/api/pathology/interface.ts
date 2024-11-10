import { Pathology, getLista } from '../interface';

export type postPathologyprops = {
  name: string;
  description: string;
};
export type Pathologyprops = {
  id: string;
  name: string;
  description: string;
};

export interface getPathologyPops {
  search?: string;
}

export abstract class modelPathology {
  abstract getPathology: (props?: getPathologyPops) => Promise<getLista<Pathology>>;
  abstract postPathology: ({ name, description }: postPathologyprops) => Promise<Pathology>;
  abstract patchPathology: ({ id, name, description }: Pathologyprops) => Promise<Pathology>;
  abstract deletePathology: ({ id, name, description }: Pathologyprops) => Promise<Pathology>;
}
