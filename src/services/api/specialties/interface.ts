import { getLista, Specialty } from '../interface';

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

export type putUserAgendaProps = {
  id: string;
  agendaId: string;
};

export abstract class SpecialtiesInterface {
  abstract post: ({ name, description }: PostSpecialtyProps) => Promise<Specialty>;
  abstract get: ({ disable }: { disable: string }) => Promise<getLista<Specialty>>;
  abstract getDisable: ({ disable }: { disable: string }) => Promise<getLista<Specialty>>;
  abstract getById: ({ id }: { id: string }) => Promise<Specialty>;
  abstract patch: ({ id, name, description }: PatchSpecialtyProps) => Promise<Specialty>;
  abstract disabled: ({ id, isDisabled }: DisabledSpecialtyProps) => Promise<Specialty>;
  abstract putAssignTemplate: (props: putAssignTemplateProps) => Promise<Specialty>;
  abstract putAssignAgendaSpecialty: ({ id, agendaId }: putUserAgendaProps) => Promise<Specialty>;
}
