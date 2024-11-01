/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const packageSchema = z.object({
  slug: z.array(z.string()).min(1, 'Tienes que seleccionar al menos un elemento'),
});

export type packageSchema = z.infer<typeof packageSchema>;
