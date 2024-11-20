/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const ArticleCategorySchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre'),
});

export type ArticleCategorySchema = z.infer<typeof ArticleCategorySchema>;
