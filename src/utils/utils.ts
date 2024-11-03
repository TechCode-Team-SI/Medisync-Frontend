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
