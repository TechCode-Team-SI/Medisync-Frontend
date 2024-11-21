import { Area, getLista, WithPagination, WithSearch } from '../interface';

export interface postAreaProps {
  name: string;
  address: string;
  specialty: { id: string };
}

export interface patchAreaProps {
  id: string;
  name: string;
  address: string;
  specialty: { id: string };
}

export type DisabledAreaProps = {
  id: string;
  isDisabled: boolean;
};

export type PaginationWithSearch = WithPagination & WithSearch;

export abstract class Rooms {
  abstract getMyArea: (props: PaginationWithSearch) => Promise<getLista<Area>>;
  abstract getArea: (token: string) => Promise<getLista<Area>>;
  abstract postArea: (data: postAreaProps) => Promise<Area>;
  abstract patchArea: (data: patchAreaProps) => Promise<Area>;
}
