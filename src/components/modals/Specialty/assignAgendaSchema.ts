/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const assignAgendaSchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre'),
  description: z.string().min(1, 'Ingrese la descripcion'),
  agenda: z.string().min(1, 'Ingrese la descripcion'),
});

export type AssignAgendaSchema = z.infer<typeof assignAgendaSchema>;
