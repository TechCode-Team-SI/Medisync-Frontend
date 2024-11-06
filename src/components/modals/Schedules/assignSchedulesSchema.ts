/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const assignSchedulesSchema = z.object({
  fullName: z.string().min(1, 'Ingrese el nombre.'),
  dni: z.string().min(1, 'Ingrese la descripcion.'),
  scheduleId: z.string().min(1, 'Elija un horario.'),
});

export type AssignSchedulesSchema = z.infer<typeof assignSchedulesSchema>;
