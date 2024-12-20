import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Session } from './services/api/interface';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserPermissions(session: Session): string[] {
  const permissions: string[] = [];

  if (!session.user.roles) return permissions;

  for (const role of session.user.roles) {
    const permissions = role.permissions.map((permission) => permission.slug);
    permissions.push(...permissions);
  }

  return [...new Set(permissions)];
}

export function hasCoincidences(requiredArray: string[], evaluatedArray: string[]): boolean {
  for (const required of requiredArray) {
    if (evaluatedArray.includes(required)) return true;
  }
  return false;
}

export function allCoincidences(requiredArray: string[], evaluatedArray: string[]): boolean {
  return requiredArray.every((required) => evaluatedArray.includes(required));
}

export function parseText(text: string) {
  return text.replace(/(\r\n|\n|\r)/gm, ' ').replaceAll(/ /g, ' ');
}
