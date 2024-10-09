/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const demoSchema = z.object({
  email: z.string().min(1, 'Ingrese el usuario'),
  password: z.string().min(6, 'Ingrese la contraseña'),
});

export type DemoSchema = z.infer<typeof demoSchema>;
