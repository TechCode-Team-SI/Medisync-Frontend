import { getLista, Specialty } from '../interface';

export type PostSpecialtyProps = {
  name: string;
  description: string;
};

export type PatchSpecialtyProps = {
  id: string;
  name: string;
  description: string;
};

export type DisabledSpecialtyProps = {
  id: string;
  isDisabled: boolean;
};

export type putAssignTemplateProps = {
  id: string;
  templateId: string;
};

export abstract class SpecialtiesInterface {
  abstract post: ({ name, description }: PostSpecialtyProps) => Promise<Specialty>;
  abstract get: () => Promise<getLista<Specialty>>;
  abstract getById: (id: string) => Promise<Specialty>;
  abstract patch: ({ id, name, description }: PatchSpecialtyProps) => Promise<Specialty>;
  abstract disabled: ({ id, isDisabled }: DisabledSpecialtyProps) => Promise<Specialty>;
  abstract putAssignTemplate: (props: putAssignTemplateProps) => Promise<Specialty>;
}
