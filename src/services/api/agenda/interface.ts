import { Agenda, getLista, WithPagination, WithSearch } from '../interface';

export type agendaProps = {
  name: string;
  weekdays: string[];
  daysOffs: daysOffsProps[];
  from: string;
  to: string;
  slotTime: number;
};
export type daysOffsProps = {
  from: string;
  to: string;
};

export type daysOffsProps2 = {
  id: string;
  from: string;
  to: string;
};

export type patchAgendaProps = {
  id: string;
  name: string;
  weekdays: string[];
  from: string;
  to: string;
  slotTime: number;
  daysOffs: daysOffsProps2[];
};

export type PaginationWithSearch = WithPagination & WithSearch;

export abstract class Agendas {
  abstract getMyAgenda: (props: PaginationWithSearch) => Promise<getLista<Agenda>>;
  abstract getAgenda: () => Promise<getLista<Agenda>>;
  abstract postAgenda: ({ name, weekdays, daysOffs, from, to, slotTime }: agendaProps) => Promise<Agenda>;
  abstract patchAgenda: ({ id, name, weekdays, daysOffs, from, to, slotTime }: patchAgendaProps) => Promise<Agenda>;
}
