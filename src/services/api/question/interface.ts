import { FieldQuestion, getLista, WithPagination, WithSearch } from '../interface';

export interface postFieldQuestionprops {
  name: string;
  description?: string;
  label: string;
  type: string;
  isRequired: boolean;
  selectionConfig?: {
    isMultiple: boolean;
  };
  selections?: { value: string }[];
}

export interface getFieldQuestionProps {
  search?: string;
}
export type PaginationWithSearch = WithPagination & WithSearch;

export abstract class modelFieldQuestion {
  abstract getMyFieldQuestion: (props: PaginationWithSearch) => Promise<getLista<FieldQuestion>>;
  abstract getFieldQuestion: (props: getFieldQuestionProps) => Promise<getLista<FieldQuestion>>;
  abstract deleteFieldQuestion: (id: string) => Promise<getLista<FieldQuestion>>;
  abstract postFieldQuestion: ({ name, description }: postFieldQuestionprops) => Promise<FieldQuestion>;
}
