/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().min(1, 'Ingrese el nombre'),
  description: z.string().min(1, 'Ingrese la descripcion'),
});

export type PostSchema = z.infer<typeof PostSchema>;
