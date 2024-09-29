import { Session } from '../interface';

export type loginProps = {
  email: string;
  password: string;
};

export abstract class AuthLogin {
  abstract login: ({ email, password }: loginProps) => Promise<Session>;
}
