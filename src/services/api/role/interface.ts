import { Role, getLista } from '../interface';

export abstract class Rol {
  abstract getRoles: (token: string) => Promise<getLista<Role>>;
}
