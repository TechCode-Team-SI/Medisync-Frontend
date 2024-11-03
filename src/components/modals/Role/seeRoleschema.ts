/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const seeRoleSchema = z.object({
  fullName: z.string().min(1, 'Ingrese el nombre'),
  dni: z.string().min(1, 'Ingrese la descripcion'),
  role: z.array(z.string()).min(1, 'Ingrese la descripcion'),
});

export type SeeRoleSchema = z.infer<typeof seeRoleSchema>;
