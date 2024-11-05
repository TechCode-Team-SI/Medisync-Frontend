import { z } from 'zod';

export const createReferenceSchema = z.object({
  fullName: z.string().min(1, 'Campo Requerido'),
  dni: z.string().min(1, 'Campo Requerido'),
  MPPS: z.string().min(1, 'Campo Requerido'),
  address: z.string().min(1, 'Campo Requerido'),
  CML: z.string().min(1, 'Campo Requerido'),
  birthday: z
    .date({
      required_error: 'Campo Requerido',
    })
    .refine((date) => date < new Date(), {
      message: 'La fecha debe ser anterior a hoy',
    }),
  phone: z.string().min(1, 'Campo Requerido'),
  gender: z.string().min(1, 'Campo Requerido'),
  email: z.string().email().min(1, 'Campo Requerido'),
  password: z.string().min(6, 'Campo Requerido'),
  password2: z.string().min(6, 'Campo Requerido'),
  status: z.string(),
});

export type CreateReferenceSchema = z.infer<typeof createReferenceSchema>;
