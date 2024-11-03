import { Schedules, getLista } from '../interface';

export interface postScheduleProps {
  name: string;
  from: string;
  to: string;
  slotTime: string;
}

export interface patchScheduleProps {
  id: string;
  name: string;
  from: string;
  to: string;
  slotTime: string;
}

export abstract class Schedule {
  abstract getSchedule: (token: string) => Promise<getLista<Schedules>>;
  abstract postSchedule: (data: postScheduleProps) => Promise<Schedules>;
  abstract patchSchedule: (data: patchScheduleProps) => Promise<Schedules>;
}
