import { User, getLista } from '../interface';

export type postUserProps = {
  password: string;
  email: string;
  fullName: string;
  phone: string;
  role: [{ idRol: string | null }];
  schedule: { idSchedule: string | null };
  rooms: { idRooms: string | null };
  employeeProfile: {
    address: string;
    birthday: string;
    dni: string;
    CML: string;
    MPPS: string;
    gender: string;
    specialties: [{ idspecialties: string | null }];
  };
};
export type UserProps = {
  id: string;
  password: string;
  email: string;
  fullName: string;
  phone: string;
  role: [{ idRol: string | null }];
  schedule: { idSchedule: string | null };
  rooms: { idRooms: string | null };
  employeeProfile: {
    id: string;
    address: string;
    birthday: string;
    dni: string;
    CML: string;
    MPPS: string;
    gender: string;
    specialties: [{ idspecialties: string | null }];
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
      role: [{ idRol }],
      schedule: { idSchedule },
      rooms: { idRooms },
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
      role: [{ idRol }],
      schedule: { idSchedule },
      rooms: { idRooms },
      employeeProfile: { address, birthday, dni, CML, MPPS, gender },
    }: UserProps,
    token: string,
  ) => Promise<User>;
}
