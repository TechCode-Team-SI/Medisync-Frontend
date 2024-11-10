/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const assignAreaSchema = z.object({
  fullName: z.string().min(1, 'Ingrese el nombre.'),
  dni: z.string().min(1, 'Ingrese la descripcion.'),
  area: z.string().min(1, 'Elija un horario.'),
});

export type AssignAreaSchema = z.infer<typeof assignAreaSchema>;

// Pending
