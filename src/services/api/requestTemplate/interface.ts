import { RequestTemplate, getLista } from '../interface';

export type postRequestTemplateprops = {
  name: string;
  description?: string;
  fields: { fieldQuestion: { id: string }; order: number }[];
};

export interface getRequestTemplateProps {
  search?: string;
}

export abstract class modelRequestTemplate {
  abstract getRequestTemplate: (props: getRequestTemplateProps) => Promise<getLista<RequestTemplate>>;
  abstract postRequestTemplate: (props: postRequestTemplateprops) => Promise<RequestTemplate>;
}
