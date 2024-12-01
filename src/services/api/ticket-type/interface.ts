import { TicketType, getLista, WithPagination } from '../interface';

export type postTicketTypeprops = {
  name: string;
  description: string;
};
export type pachtTicketTypeprops = {
  id: string;
  name: string;
  description: string;
};

export interface getTicketTypeProps extends WithPagination {
  search?: string;
}

export abstract class modelTicketType {
  abstract getTicketType: (props?: getTicketTypeProps) => Promise<getLista<TicketType>>;
  abstract postTicketType: ({ name }: postTicketTypeprops) => Promise<TicketType>;
  abstract patchTicketType: ({ id, name }: pachtTicketTypeprops) => Promise<TicketType>;
  abstract deleteTicketType: ({ id, name }: pachtTicketTypeprops) => Promise<TicketType>;
}
