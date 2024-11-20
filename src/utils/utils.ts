import { ClassValue, clsx } from 'clsx';
import {
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  intervalToDuration,
  startOfDay,
  startOfMonth,
  startOfYear,
} from 'date-fns';
import { es } from 'date-fns/locale';
import qs from 'qs';
import { twMerge } from 'tailwind-merge';

import { GenderEnum, RequestStatusEnum } from './constants';

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function urlQueryBuilder(obj: unknown) {
  return qs.stringify(obj, { addQueryPrefix: true, encode: false, arrayFormat: 'repeat' });
}

export function formatLink(
  link: string,
  params: Record<string, string>,
  query?: {
    filters?: Record<string, unknown>;
    sortBy?: { order: 'ASC' | 'DESC'; field: string };
    [key: string]: unknown;
  },
) {
  let formattedQuery = {};
  if (query) {
    const { sortBy, ...rest } = query;
    formattedQuery = { ...rest };
    if (sortBy) {
      formattedQuery = {
        ...formattedQuery,
        sort: [
          {
            order: sortBy.field,
            orderBy: sortBy.order,
          },
        ],
      };
    }
  }
  let newLink = link;
  Object.keys(params).forEach((key) => {
    newLink = newLink.replace(`:${key}`, params[key]);
  });
  return newLink + urlQueryBuilder(formattedQuery);
}

export function getPagination(page?: string, limit?: string) {
  return {
    page: page || '1',
    limit: limit || '10',
  };
}

export function getGenderLabel(gender: GenderEnum) {
  switch (gender) {
    case GenderEnum.MALE:
      return 'Masculino';
    default:
      return 'Femenino';
  }
}

export function parseRequestStatus(status: RequestStatusEnum) {
  switch (status) {
    case RequestStatusEnum.ATTENDING:
      return 'Atendiendo';
    case RequestStatusEnum.CANCELLED:
      return 'Cancelado';
    case RequestStatusEnum.COMPLETED:
      return 'Completado';
    default:
      return 'Pendiente';
  }
}

export function formatDate(date: Date) {
  return format(date, 'P', { locale: es });
}

export function calculateAge(birthDate: Date) {
  const { years } = intervalToDuration({ start: birthDate, end: new Date() });
  return years;
}

export function getDates(time: string, user: Date) {
  switch (time) {
    case 'TODAY':
      return {
        start: startOfDay(new Date()).toISOString(),
        end: endOfDay(new Date()).toISOString(),
      };
    case 'THIS_MONTH':
      return {
        start: startOfMonth(new Date()).toISOString(),
        end: endOfMonth(new Date()).toISOString(),
      };
    case 'THIS_YEAR':
      return {
        start: startOfYear(new Date()).toISOString(),
        end: endOfYear(new Date()).toISOString(),
      };
    default:
      return {
        start: startOfDay(user).toISOString(),
        end: endOfYear(new Date()).toISOString(),
      };
  }
}
