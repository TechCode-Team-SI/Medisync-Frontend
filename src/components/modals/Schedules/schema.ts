/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const demoSchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre'),
  from: z.string().min(1, 'Ingrese el horario de inicio.'),
  to: z.string().min(1, 'Ingrese el horario de fin.'),
  slotTime: z.string().min(1, 'Ingrese el tiempo entre citas.'),
});

export type DemoSchema = z.infer<typeof demoSchema>;
