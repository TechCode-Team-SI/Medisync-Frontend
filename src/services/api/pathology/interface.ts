/* eslint-disable prettier/prettier */
import { Pathology, getLista, WithPagination, WithSearch  } from '../interface';

export type RequestPathologyprops = {
  name?: string;
  description?: string;
} & WithPagination & WithSearch;

export type postPathologyprops = {
  name: string;
  description: string;
};

export type Pathologyprops = {
  id: string;
  name: string;
  description: string;
};

export abstract class modelPathology {
  abstract getMyPathology: (props: RequestPathologyprops) => Promise<getLista<Pathology>>;
  abstract getPathology: () => Promise<getLista<Pathology>>;
  abstract postPathology: ({ name, description }: postPathologyprops) => Promise<Pathology>;
  abstract patchPathology: ({ id, name, description }: Pathologyprops) => Promise<Pathology>;
  abstract deletePathology: ({ id, name, description }: Pathologyprops) => Promise<Pathology>;
}
