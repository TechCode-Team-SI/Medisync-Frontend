import { UserAdmin } from '../interface';

export type firstUserProps = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  employeeProfile: {
    address: string;
    birthday: string;
    dni: string;
    CML: string;
    MPPS: string;
    gender: string;
  };
};

export abstract class CreateFirstUser {
  abstract FirstUser: ({ email, password, fullName }: firstUserProps) => Promise<UserAdmin>;
}
