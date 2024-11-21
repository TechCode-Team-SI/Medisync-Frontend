/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const agendaSchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre'),
  weekdays: z.array(z.string()).min(1, 'Ingrese el campo'),
  from: z.string().min(1, 'Ingrese el horario de inicio.'),
  to: z.string().min(1, 'Ingrese el horario de fin.'),
  slotTime: z.string().min(1, 'Ingrese el tiempo entre citas.'),
});

export type AgendaSchema = z.infer<typeof agendaSchema>;
