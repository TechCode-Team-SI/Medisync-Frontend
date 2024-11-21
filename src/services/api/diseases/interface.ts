import { Disease, getLista, WithPagination, WithSearch } from '../interface';

export type postDiseaseprops = {
  name: string;
  description: string;
};
export type pachtDiseaseprops = {
  id: string;
  name: string;
  description: string;
};
export type PaginationWithSearch = WithPagination & WithSearch;

export interface getDiseaseProps {
  search?: string;
}

export abstract class modelDiseases {
  abstract getMyDisease: (props: PaginationWithSearch) => Promise<getLista<Disease>>;
  abstract getDisease: () => Promise<getLista<Disease>>;
  abstract postDisease: ({ name, description }: postDiseaseprops) => Promise<Disease>;
  abstract patchDisease: ({ id, name, description }: pachtDiseaseprops) => Promise<Disease>;
  abstract deleteDisease: ({ id, name, description }: pachtDiseaseprops) => Promise<Disease>;
}
