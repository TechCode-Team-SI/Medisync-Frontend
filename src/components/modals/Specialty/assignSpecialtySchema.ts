/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const assignSpecialtySchema = z.object({
  fullName: z.string().min(1, 'Ingrese el nombre'),
  dni: z.string().min(1, 'Ingrese la descripcion'),
  specialty: z.array(z.string()).min(1, 'Ingrese la descripcion'),
});

export type AssignSpecialtySchema = z.infer<typeof assignSpecialtySchema>;
