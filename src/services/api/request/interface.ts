import { RequestStatusEnum } from 'src/utils/constants';

import { WithPagination, WithSearch, Requests, getLista } from '../interface';

export type RequestsProps = {
  startDate?: Date;
  endDate?: Date;
  status?: RequestStatusEnum[];
  today?: boolean;
} & WithPagination &
  WithSearch;

export interface DiagnosticProps {
  id: string;
  diagnostic: Diagnostic;
  instructions: string;
}

export interface Diagnostic {
  description: string;
  illnesses: string[];
  injuries: string[];
  treatments: string[];
  symptoms: string[];
  pathologies: string[];
}

export abstract class modelRequests {
  abstract getMyRequests: (props: RequestsProps) => Promise<getLista<Requests>>;
  abstract getRequestsCalendar: (props: RequestsProps) => Promise<getLista<Requests>>;
  abstract getRequests: () => Promise<getLista<Requests>>;
  abstract getRequestsByID: (props: { id: string }) => Promise<Requests>;
  abstract attendRequest: (props: { id: string }) => Promise<Requests>;
  abstract cancelRequest: (props: { requestId: string }) => Promise<Requests>;
  abstract postAttendRequest: (props: DiagnosticProps) => Promise<Requests>;
}
