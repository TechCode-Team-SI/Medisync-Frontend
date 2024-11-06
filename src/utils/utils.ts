import { clsx, ClassValue } from 'clsx';
import qs from 'qs';
import { twMerge } from 'tailwind-merge';

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
