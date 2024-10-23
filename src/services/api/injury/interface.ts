import { Injury, getLista } from '../interface';

export type postInjuryprops = {
  name: string;
  description: string;
};
export type pachtInjuryprops = {
  id: string;
  name: string;
  description: string;
};

export abstract class modelInjury {
  abstract getInjury: () => Promise<getLista<Injury>>;
  abstract postInjury: ({ name, description }: postInjuryprops) => Promise<Injury>;
  abstract patchInjury: ({ id, name, description }: pachtInjuryprops) => Promise<Injury>;
  abstract deleteInjury: ({ id, name, description }: pachtInjuryprops) => Promise<Injury>;
}
