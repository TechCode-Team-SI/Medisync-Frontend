import { Role, getLista } from '../interface';

export abstract class Rol {
  abstract getRoles: () => Promise<getLista<Role>>;
}
