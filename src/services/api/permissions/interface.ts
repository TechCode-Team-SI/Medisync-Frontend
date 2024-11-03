import { Permission, getLista } from '../interface';

export abstract class Permissions {
  abstract getPermission: () => Promise<getLista<Permission>>;
}
