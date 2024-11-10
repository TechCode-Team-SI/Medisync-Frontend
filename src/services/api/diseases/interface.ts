import { Disease, getLista } from '../interface';

export type postDiseaseprops = {
  name: string;
  description: string;
};
export type pachtDiseaseprops = {
  id: string;
  name: string;
  description: string;
};

export interface getDiseaseProps {
  search?: string;
}

export abstract class modelDiseases {
  abstract getDisease: (props?: getDiseaseProps) => Promise<getLista<Disease>>;
  abstract postDisease: ({ name, description }: postDiseaseprops) => Promise<Disease>;
  abstract patchDisease: ({ id, name, description }: pachtDiseaseprops) => Promise<Disease>;
  abstract deleteDisease: ({ id, name, description }: pachtDiseaseprops) => Promise<Disease>;
}
