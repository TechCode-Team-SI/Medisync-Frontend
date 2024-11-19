import { User, WithPagination, WithSearch, getLista } from '../interface';

export type postUserProps = {
  password: string | null;
  email: string | null;
  fullName: string | null;
  phone: string | null;
  employeeProfile: {
    address: string | null;
    birthday: string | null;
    dni: string | null;
    CML?: string | null;
    MPPS?: string | null;
    gender: string | null;
    isMedic: boolean;
  };
};
export type UserProps = {
  id: string;
  password: string | null;
  email: string | null;
  fullName: string | null;
  phone: string | null;
  employeeProfile: {
    id: string;
    address: string | null;
    birthday: string;
    dni: string | null;
    CML?: string | null;
    MPPS?: string | null;
    gender: string | null;
    isMedic: boolean;
  };
};
export type PaginationWithSearch = WithPagination & WithSearch;

export abstract class MedicalStaff {
  abstract getMyMedical: (props: PaginationWithSearch) => Promise<getLista<User>>;
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
