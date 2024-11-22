import { Suggestion, WithPagination, WithSearch, getLista } from '../interface';

export type PaginationWithSearch = WithPagination & WithSearch;

export abstract class modelSuggestions {
  abstract getMySugestion: (props: PaginationWithSearch) => Promise<getLista<Suggestion>>;
  abstract getSugestion: () => Promise<getLista<Suggestion>>;
}
