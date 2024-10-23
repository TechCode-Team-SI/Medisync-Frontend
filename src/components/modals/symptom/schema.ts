/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const InjurySchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre'),
  description: z.string().min(1, 'Ingrese la descripcion'),
});

export type InjurySchema = z.infer<typeof InjurySchema>;
