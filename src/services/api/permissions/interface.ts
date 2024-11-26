import { Permission, WithPagination, getLista } from '../interface';

export type PaginationWithSearch = WithPagination;

export abstract class Permissions {
  abstract getMyPermission: (props: PaginationWithSearch) => Promise<getLista<Permission>>;
  abstract getPermission: () => Promise<getLista<Permission>>;
}
