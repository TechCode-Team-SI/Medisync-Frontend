import { getLista, Specialty, WithPagination, WithSearch } from '../interface';

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
export type PaginationWithSearch = WithPagination & WithSearch;

export abstract class SpecialtiesInterface {
  abstract getMySpecialty: (props: PaginationWithSearch) => Promise<getLista<Specialty>>;
  abstract post: ({ name, description }: PostSpecialtyProps) => Promise<Specialty>;
  abstract get: () => Promise<getLista<Specialty>>;
  abstract getById: (id: string) => Promise<Specialty>;
  abstract patch: ({ id, name, description }: PatchSpecialtyProps) => Promise<Specialty>;
  abstract disabled: ({ id, isDisabled }: DisabledSpecialtyProps) => Promise<Specialty>;
  abstract putAssignTemplate: (props: putAssignTemplateProps) => Promise<Specialty>;
}
