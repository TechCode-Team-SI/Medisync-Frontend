/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const demoSchema = z.object({
  host: z.string().min(1, 'Nombre requerido'),
  token: z.string().min(6, 'Ingrese el token'),
});

export type DemoSchema = z.infer<typeof demoSchema>;
