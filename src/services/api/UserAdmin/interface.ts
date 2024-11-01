import { UserAdmin } from '../interface';

export type firstUserProps = {
  fullName: string;
  email: string;
  password: string;
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

export abstract class CreateFirstUser {
  abstract FirstUser: ({ email, password, fullName }: firstUserProps) => Promise<UserAdmin>;
}
