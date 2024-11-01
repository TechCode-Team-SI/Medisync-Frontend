import { Schedules, getLista } from '../interface';

export interface postScheduleProps {
  name: string;
  start: string;
  end: string;
}

export abstract class Schedule {
  abstract getSchedule: (token: string) => Promise<getLista<Schedules>>;
  abstract postSchedule: (data: postScheduleProps) => Promise<Schedules>;
}
