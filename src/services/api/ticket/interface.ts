import { Treatment, User } from '../interface';

export type TicketChat = {
  id: string;
  message: string;
  sender: User;
  createdAt: string;
};

export type TicketChatMessage = {
  id: string;
  comment: string;
};

export abstract class modelTickets {
  // abstract getTicketComplaint: () => Promise<any>;
  abstract postTicket: ({ id, comment }: TicketChatMessage) => Promise<Treatment>;
}
