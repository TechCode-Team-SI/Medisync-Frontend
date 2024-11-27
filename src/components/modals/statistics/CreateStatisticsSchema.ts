/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const createStatistics = z.object({
  label: z.string().min(1, 'Ingrese el campo'),
  type: z.string().min(1, 'Ingrese el campo'),
  filteredByType: z.string().min(1, 'Ingrese el campo'),
  filter: z.string().min(1, 'Ingrese el campo').optional(),
  fieldQuestionId: z.string().min(1, 'Ingrese el campo'),
});

export type CreateStatistics = z.infer<typeof createStatistics>;
