/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const demoSchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre.'),
  address: z.string().min(1, 'Ingrese la dirección.'),
  specialty: z.string(),
});

export type DemoSchema = z.infer<typeof demoSchema>;
