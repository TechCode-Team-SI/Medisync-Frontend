import { ClassValue, clsx } from 'clsx';
import { format, intervalToDuration } from 'date-fns';
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
  return qs.stringify(obj, { addQueryPrefix: true, encode: false });
}

export function formatLink(
  link: string,
  params: Record<string, string>,
  query?: {
    filters?: Record<string, string | string[]>;
    sortBy?: { order: 'ASC' | 'DESC'; field: string };
    [key: string]: any;
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
