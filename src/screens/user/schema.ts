import { z } from 'zod';

export const createReferenceSchema = z.object({
  name: z.string().min(1, 'Campo Requerido'),
  id: z.number().int().min(1, 'Campo Requerido'),
  MPPS: z.string().min(1, 'Campo Requerido'),
  CML: z.string().min(1, 'Campo Requerido'),
  birthdayDate: z.date({ required_error: 'Campo Requerido', invalid_type_error: 'Formato Invalido' }),
  phone: z.string().min(1, 'Campo Requerido'),
  gender: z.string().min(1, 'Campo Requerido'),
  email: z.string().email().min(1, 'Campo Requerido'),
  status: z.string().min(1, 'Campo Requerido'),
});

export type CreateReferenceSchema = z.infer<typeof createReferenceSchema>;
