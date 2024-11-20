import { RequestTemplate, WithPagination, WithSearch, getLista } from '../interface';

export type postRequestTemplateprops = {
  name: string;
  description?: string;
  fields: { fieldQuestion: { id: string }; order: number }[];
};

export interface getRequestTemplateProps {
  search?: string;
}
export type PaginationWithSearch = WithPagination & WithSearch;

export abstract class modelRequestTemplate {
  abstract getMyRequestTemplate: (props: PaginationWithSearch) => Promise<getLista<RequestTemplate>>;
  abstract getRequestTemplate: (props: getRequestTemplateProps) => Promise<getLista<RequestTemplate>>;
  abstract postRequestTemplate: (props: postRequestTemplateprops) => Promise<RequestTemplate>;
}
