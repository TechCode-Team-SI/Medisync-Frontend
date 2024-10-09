/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const demoSchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre'),
  description: z.string().min(1, 'Ingrese la descripcion'),
  // image: z.object({id: z.string()})
});

export type DemoSchema = z.infer<typeof demoSchema>;
