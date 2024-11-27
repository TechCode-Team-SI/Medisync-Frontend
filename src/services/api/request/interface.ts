import { GenderEnum, RequestStatusEnum } from 'src/utils/constants';

import { WithPagination, WithSearch, Requests, getLista, RequestFormatted } from '../interface';

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

export interface createRequestServiceProps {
  patientFullName: string;
  patientAddress?: string;
  patientGender: GenderEnum;
  patientBirthday: Date;
  patientDNI: string;
  requestTemplateId: string;
  medicId: string;
  specialtyId: string;
  appointmentHour: string;
  appointmentDate: Date;
  referredContent?: string;
  requestValues: (
    | {
        value: string;
        fieldQuestion: {
          id: string;
        };
      }
    | {
        fieldQuestion: {
          id: string;
        };
        selections: {
          id: string;
        }[];
      }
  )[];
}
export type PaginationWithSearch = WithPagination & WithSearch;

export abstract class modelRequests {
  abstract getSeeRequests: (props: PaginationWithSearch) => Promise<getLista<Requests>>;
  abstract getMyRequests: (props: RequestsProps) => Promise<getLista<Requests>>;
  abstract getRequestsCalendar: (props: RequestsProps) => Promise<getLista<Requests>>;
  abstract getRequests: () => Promise<getLista<Requests>>;
  abstract getRequestsByID: (props: { id: string }) => Promise<RequestFormatted>;
  abstract attendRequest: (props: { id: string }) => Promise<Requests>;
  abstract cancelRequest: (props: { requestId: string }) => Promise<Requests>;
  abstract postAttendRequest: (props: DiagnosticProps) => Promise<Requests>;
  abstract postCreatePrivateRequest: (props: createRequestServiceProps) => Promise<boolean>;
}
