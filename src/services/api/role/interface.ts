import { Role, getLista } from '../interface';

export type porpsRole = {
  name: string;
  permissions: permission[];
};

export type permission = {
  id: string;
};

export type patchPorpsRole = {
  id: string;
  name: string;
  permissions: permission[];
};

export abstract class Rol {
  abstract getRoles: () => Promise<getLista<Role>>;
  abstract postRoles: ({ name, permissions }: porpsRole) => Promise<Role>;
  abstract patchRoles: ({ id, name, permissions }: patchPorpsRole) => Promise<Role>;
  abstract deleteRoles: ({ id, name, permissions }: patchPorpsRole) => Promise<Role>;
}
