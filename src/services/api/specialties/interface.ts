import { getLista, Specialty, WithPagination, WithSearch } from '../interface';

export type PostSpecialtyProps = {
  name: string;
  description: string;
  image?: {
    id: string;
    path: string;
  };
};

export type PatchSpecialtyProps = {
  id: string;
  name: string;
  description: string;
  image?: {
    id: string;
    path: string;
  };
};

export type DisabledSpecialtyProps = {
  id: string;
  isDisabled: boolean;
};

export type putAssignTemplateProps = {
  id: string;
  templateId: string;
};
export type PaginationWithSearch = {
  id?: string;
  isDisabled?: boolean;
} & WithPagination &
  WithSearch;

export type putUserAgendaProps = {
  id: string;
  agendaId: string;
};

export abstract class SpecialtiesInterface {
  abstract getMySpecialty: (props: PaginationWithSearch) => Promise<getLista<Specialty>>;
  abstract post: ({ name, description }: PostSpecialtyProps) => Promise<Specialty>;
  abstract get: ({ disable }: { disable: string }) => Promise<getLista<Specialty>>;
  abstract getDisable: ({ disable }: { disable: string }) => Promise<getLista<Specialty>>;
  abstract getActive: (props: WithPagination) => Promise<getLista<Specialty>>;
  abstract getById: ({ id }: { id: string }) => Promise<Specialty>;
  abstract patch: ({ id, name, description }: PatchSpecialtyProps) => Promise<Specialty>;
  abstract disabled: ({ id, isDisabled }: DisabledSpecialtyProps) => Promise<Specialty>;
  abstract putAssignTemplate: (props: putAssignTemplateProps) => Promise<Specialty>;
  abstract putAssignAgendaSpecialty: ({ id, agendaId }: putUserAgendaProps) => Promise<Specialty>;
}
