/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const roleSchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre'),
  description: z.string().min(1, 'Ingrese la descripcion'),
  permissions: z.array(z.string()).min(1, 'Ingrese la descripcion'),
});

export type RoleSchema = z.infer<typeof roleSchema>;
