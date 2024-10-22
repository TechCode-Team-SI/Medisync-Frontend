import { Schedules, getLista } from '../interface';

export abstract class Schedule {
  abstract getSchedule: (token: string) => Promise<getLista<Schedules>>;
}
