/* eslint-disable prettier/prettier */
import { WithPagination, WithSearch, Injury, getLista } from '../interface';


export type postInjuryprops = {
  name: string;
  description: string;
};

export type PaginationWithSearch = WithPagination & WithSearch;

export type pachtInjuryprops = {
  id: string;
  name: string;
  description: string;
};



export abstract class modelInjury {
  abstract getMyInjury: (props: PaginationWithSearch ) => Promise<getLista<Injury>>;
  abstract getInjury: () => Promise<getLista<Injury>>;
  abstract postInjury: ({ name, description }: postInjuryprops) => Promise<Injury>;
  abstract patchInjury: ({ id, name, description }: pachtInjuryprops) => Promise<Injury>;
  abstract deleteInjury: ({ id, name, description }: pachtInjuryprops) => Promise<Injury>;
}
