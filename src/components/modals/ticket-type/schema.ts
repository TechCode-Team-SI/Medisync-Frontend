/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const TicketTypeSchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre'),
  description: z.string().min(1, 'Ingrese la descripción'),
});

export type TicketTypeSchema = z.infer<typeof TicketTypeSchema>;
