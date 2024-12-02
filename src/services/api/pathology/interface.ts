/* eslint-disable prettier/prettier */
import { Pathology, getLista, WithPagination, WithSearch } from '../interface';

export type postPathologyprops = {
  name: string;
  description: string;
};
export type PaginationWithSearch = WithPagination & WithSearch;

export type Pathologyprops = {
  id: string;
  name: string;
  description: string;
};

export interface getPathologyPops {
  search?: string;
}

export abstract class modelPathology {
  abstract getMyPathology: (props: PaginationWithSearch) => Promise<getLista<Pathology>>;
  abstract getPathology: (props: WithSearch) => Promise<getLista<Pathology>>;
  abstract postPathology: ({ name, description }: postPathologyprops) => Promise<Pathology>;
  abstract patchPathology: ({ id, name, description }: Pathologyprops) => Promise<Pathology>;
  abstract deletePathology: ({ id, name, description }: Pathologyprops) => Promise<Pathology>;
}
