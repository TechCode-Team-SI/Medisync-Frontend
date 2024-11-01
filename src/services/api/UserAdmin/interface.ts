import { UserAdmin } from '../interface';

export type firstUserProps = {
  fullName: string;
  email: string;
  password: string;
};

export abstract class CreateFirstUser {
  abstract FirstUser: ({ email, password, fullName }: firstUserProps) => Promise<UserAdmin>;
}
