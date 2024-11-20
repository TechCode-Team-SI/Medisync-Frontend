import { Claim, getLista, WithPagination, WithSearch } from '../interface';

export type PaginationWithSearch = WithPagination & WithSearch;

export abstract class modelClaims {
  abstract getMyClaim: (props: PaginationWithSearch) => Promise<getLista<Claim>>;
  abstract getClaim: () => Promise<getLista<Claim>>;
}
