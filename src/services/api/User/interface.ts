import { getLista, User, WithPagination, WithSearch, Image } from '../interface';

export type postUserProps = {
  password: string;
  email: string;
  fullName: string;
  image?: Image;
  employeeProfile: {
    address: string;
    birthday: Date;
    dni: string;
    CML: string;
    MPPS: string;
    gender: string;
  };
};

export type UserProps = {
  id: string;
  email: string;
  fullName: string;
  image?: Image;
  phone: string;
  employeeProfile: {
    id: string;
    address: string;
    birthday: string;
    dni: string;
    CML: string;
    MPPS: string;
    gender: string;
    isMedic: boolean;
  };
};

export type putUserRoleProps = {
  id: string;
  roleIds: string[];
};

export type putShceduleUserProps = {
  id: string;
  scheduleId: string;
};

export type putUserAgendaProps = {
  id: string;
  agendaId: string;
};

export type putUserAreaProps = {
  id: string;
  roomId: string;
};

export type putUserSpecialtyProps = {
  id: string;
  specialtyIds: string[];
};
export type getbyIdUserProps = {
  id: string;
};
export type PaginationWithSearch = WithPagination & WithSearch;

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
  abstract getMyEmployees: (props: PaginationWithSearch) => Promise<getLista<User>>;
  abstract get: (token: string) => Promise<getLista<User>>;
  abstract getEmployees: () => Promise<getLista<User>>;
  abstract getbyID: ({ id }: getbyIdUserProps) => Promise<User>;
  abstract putassignschedule: ({ id, scheduleId }: putShceduleUserProps) => Promise<User>;
  abstract putAssignRole: ({ id, roleIds }: putUserRoleProps) => Promise<User>;
  abstract putAssignAgenda: ({ id, agendaId }: putUserAgendaProps) => Promise<User>;
  abstract putAssignArea: ({ id, roomId }: putUserAreaProps) => Promise<User>;
  abstract putAssignSpecialty: ({ id, specialtyIds }: putUserSpecialtyProps) => Promise<User>;
  abstract patchUser: (
    {
      id,
      email,
      fullName,
      phone,
      employeeProfile: { address, birthday, dni, CML, MPPS, gender },
    }: UserProps,
    token: string,
  ) => Promise<User>;
}
