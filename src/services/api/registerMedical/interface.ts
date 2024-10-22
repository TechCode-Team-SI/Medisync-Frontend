import { User, getLista } from '../interface';

export type postUserProps = {
  password: string;
  email: string;
  fullName: string;
  phone: string;
  photo: { idPhoto: string };
  roles: [idRol: string];
  schedule: { idSchedule: string };
  rooms: { idRooms: string };
  employeeProfile: {
    address: string;
    birthday: Date;
    dni: string;
    CML: string;
    MPPS: string;
    gender: string;
  };
};

export abstract class MedicalStaff {
  abstract getListMedicalStaff: (token: string) => Promise<getLista<User>>;
  abstract postMedicalStaff: (
    {
      password,
      email,
      fullName,
      phone,
      photo: { idPhoto },
      roles: [idRol],
      schedule: { idSchedule },
      rooms: { idRooms },
      employeeProfile: { address, birthday, dni, CML, MPPS, gender },
    }: postUserProps,
    token: string,
  ) => Promise<User>;
}
