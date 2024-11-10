import { Symptoms, getLista } from '../interface';

export type postSymptomsprops = {
  name: string;
  description: string;
};
export type Symptomsprops = {
  id: string;
  name: string;
  description: string;
};

export interface getSymptomProps {
  search?: string;
}

export abstract class modelSymptoms {
  abstract getSymptoms: (props?: getSymptomProps) => Promise<getLista<Symptoms>>;
  abstract postSymptoms: ({ name, description }: postSymptomsprops) => Promise<Symptoms>;
  abstract patchSymptoms: ({ id, name, description }: Symptomsprops) => Promise<Symptoms>;
  abstract deleteSymptoms: ({ id, name, description }: Symptomsprops) => Promise<Symptoms>;
}
