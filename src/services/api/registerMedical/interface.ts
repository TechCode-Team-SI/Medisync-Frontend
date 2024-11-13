import { Image, User, getLista } from '../interface';

export type postUserProps = {
  password: string | null;
  email: string | null;
  fullName: string | null;
  photo?: Image;
  phone: string | null;
  employeeProfile: {
    address: string | null;
    birthday: string | null;
    dni: string | null;
    CML: string | null;
    MPPS: string | null;
    gender: string | null;
  };
};
export type UserProps = {
  id: string;
  password: string | null;
  email: string | null;
  fullName: string | null;
  photo?: Image;
  phone: string | null;
  employeeProfile: {
    id: string;
    address: string | null;
    birthday: string;
    dni: string | null;
    CML: string | null;
    MPPS: string | null;
    gender: string | null;
  };
};

export abstract class MedicalStaff {
  abstract getListMedicalStaff: () => Promise<getLista<User>>;
  abstract getListMedicalStaffById: (id: string) => Promise<User>;
  abstract postMedicalStaff: (
    {
      password,
      email,
      fullName,
      phone,
      employeeProfile: { address, birthday, dni, CML, MPPS, gender },
    }: postUserProps,
    token: string,
  ) => Promise<User>;
  abstract pachtMedicalStaff: (
    {
      id,
      password,
      email,
      fullName,
      phone,
      employeeProfile: { address, birthday, dni, CML, MPPS, gender },
    }: UserProps,
    token: string,
  ) => Promise<User>;
}
