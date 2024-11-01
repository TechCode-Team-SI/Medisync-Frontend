import { Installation, MedicalCenter } from '../interface';

export interface postCenterConifgProps {
  instagramName: string;
  twitterName: string;
  facebookName: string;
  tiktokName: string;
  email: string;
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
    instagramName,
    twitterName,
    facebookName,
    tiktokName,
    email,
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
  abstract patch: ({
    instagramName,
    twitterName,
    facebookName,
    tiktokName,
    email,
    name,
    address,
    state,
    municipality,
    parish,
    localPhone,
    mobilePhone,
    mission,
    vision,
  }: postCenterConifgProps) => Promise<MedicalCenter>;
  abstract get: (token: string) => Promise<MedicalCenter>;
}
