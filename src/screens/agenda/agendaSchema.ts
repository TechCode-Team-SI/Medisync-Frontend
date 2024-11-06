/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const agendaSchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre'),
  weekdays: z.array(z.string()).min(1, 'Ingrese el campo'),
});

export type AgendaSchema = z.infer<typeof agendaSchema>;
