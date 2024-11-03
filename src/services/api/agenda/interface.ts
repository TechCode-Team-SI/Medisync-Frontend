import { Agenda, getLista } from '../interface';

export abstract class Agendas {
  abstract getAgenda: (token: string) => Promise<getLista<Agenda>>;
}
