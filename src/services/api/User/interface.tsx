import { getLista, User } from '../interface';

export type postUserProps = {
  password: string;
  email: string;
  fullName: string;
  employeeProfile: {
    address: string;
    birthday: Date;
    dni: string;
    CML: string;
    MPPS: string;
    gender: string;
  };
};

export abstract class userInterface {
  abstract post: (
    {
      password,
      email,
      fullName,
      employeeProfile: { address, birthday, dni, CML, MPPS, gender },
    }: postUserProps,
    token: string,
  ) => Promise<User>;
  abstract get: (token: string) => Promise<getLista<User>>;
}
