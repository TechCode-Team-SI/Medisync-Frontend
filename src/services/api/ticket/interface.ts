import { Ticket, TicketStatusEnum, TicketTypeEnum, getLista } from '../interface';

export type getTicketProps = {
  type: TicketTypeEnum;
  status: TicketStatusEnum;
};

export type postTicketprops = {
  name: string;
  description: string;
};
export type pachtTicketprops = {
  id: string;
  name: string;
  description: string;
};

export abstract class modelTicket {
  abstract getTicket: (props: getTicketProps) => Promise<getLista<Ticket>>;
  abstract postTicket: ({ name, description }: postTicketprops) => Promise<Ticket>;
  abstract patchTicket: ({ id, name, description }: pachtTicketprops) => Promise<Ticket>;
  abstract deleteTicket: ({ id, name, description }: pachtTicketprops) => Promise<Ticket>;
}
