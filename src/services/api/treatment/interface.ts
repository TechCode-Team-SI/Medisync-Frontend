import { Treatment, getLista } from '../interface';

export type postTreatmentprops = {
  name: string;
  description: string;
};
export type Treatmentprops = {
  id: string;
  name: string;
  description: string;
};

export interface getTreatmentProps {
  search?: string;
}

export abstract class modelTreatment {
  abstract getTreatment: (props: getTreatmentProps) => Promise<getLista<Treatment>>;
  abstract postTreatment: ({ name, description }: postTreatmentprops) => Promise<Treatment>;
  abstract patchTreatment: ({ id, name, description }: Treatmentprops) => Promise<Treatment>;
  abstract deleteTreatment: ({ id, name, description }: Treatmentprops) => Promise<Treatment>;
}
