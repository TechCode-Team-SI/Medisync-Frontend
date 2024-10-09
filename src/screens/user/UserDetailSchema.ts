import { z } from 'zod';

export const UserDetailSchema = z.object({
  fullName: z.string().min(1, 'Campo Requerido'),
  phone: z.string().min(1, 'Campo Requerido'),
  email: z.string().email().min(1, 'Campo Requerido'),
});

export type UserDetailSchema = z.infer<typeof UserDetailSchema>;
