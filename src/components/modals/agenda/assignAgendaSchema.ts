/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const assignAgendaSchema = z.object({
  fullName: z.string().min(1, 'Ingrese el nombre'),
  dni: z.string().min(1, 'Ingrese la descripcion'),
  agenda: z.string().min(1, 'Ingrese la descripcion'),
});

export type AssignAgendaSchema = z.infer<typeof assignAgendaSchema>;
