/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const treatmentSchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre'),
  description: z.string().min(1, 'Ingrese la descripcion'),
});

export type TreatmentSchema = z.infer<typeof treatmentSchema>;
