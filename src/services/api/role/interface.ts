import { Role, WithPagination, getLista } from '../interface';

export type porpsRole = {
  name: string;
  permissions: permission[];
  description: string;
};

export type permission = {
  id: string;
};

export type patchPorpsRole = {
  id: string;
  name: string;
  description: string;
  permissions: permission[];
};
export type PaginationWithSearch = WithPagination;

export abstract class Rol {
  abstract getMyRoles: (props: PaginationWithSearch) => Promise<getLista<Role>>;
  abstract getRoles: () => Promise<getLista<Role>>;
  abstract postRoles: ({ name, description, permissions }: porpsRole) => Promise<Role>;
  abstract patchRoles: ({ id, name, description, permissions }: patchPorpsRole) => Promise<Role>;
  abstract deleteRoles: ({ id, name, description, permissions }: patchPorpsRole) => Promise<Role>;
}
