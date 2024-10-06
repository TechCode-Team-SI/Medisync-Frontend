import { Installation } from '../interface';

export interface postCenterConifgProps {
  name: string;
  address: string;
  state: string;
  municipality: string;
  parish: string;
  localPhone: string;
  mobilePhone: string;
  mission: string;
  vision: string;
}

export abstract class centerConfigInterface {
  abstract post: ({
    name,
    address,
    state,
    municipality,
    parish,
    localPhone,
    mobilePhone,
    mission,
    vision,
  }: postCenterConifgProps) => Promise<Installation>;
}
