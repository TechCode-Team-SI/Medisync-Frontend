import { Symptoms, WithPagination, WithSearch, getLista } from '../interface';

export type postSymptomsprops = {
  name: string;
  description: string;
};
export type Symptomsprops = {
  id: string;
  name: string;
  description: string;
};

export type PaginationWithSearch = WithPagination & WithSearch;

export abstract class modelSymptoms {
  abstract getMySymptoms: (props: PaginationWithSearch) => Promise<getLista<Symptoms>>;
  abstract getSymptoms: (props: WithSearch) => Promise<getLista<Symptoms>>;
  abstract postSymptoms: ({ name, description }: postSymptomsprops) => Promise<Symptoms>;
  abstract patchSymptoms: ({ id, name, description }: Symptomsprops) => Promise<Symptoms>;
  abstract deleteSymptoms: ({ id, name, description }: Symptomsprops) => Promise<Symptoms>;
}
