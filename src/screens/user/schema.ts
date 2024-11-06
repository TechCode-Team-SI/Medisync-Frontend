import { z } from 'zod';

export const createReferenceSchema = z.object({
  fullName: z.string().min(1, 'Nombre requerido'),
  dni: z.string().min(1, 'Cedula requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(1, 'Telefono inválido'),
  password: z.string().min(1, 'Contraseña requerido'),
  address: z.string().min(1, 'Dirección requerido'),
  gender: z.string().min(1, 'Campo Requerido'),
  MPPS: z.string().min(1, 'Campo Requerido'),
  CML: z.string().min(1, 'Campo Requerido'),
  birthday: z
    .date({
      required_error: 'Campo Requerido',
    })
    .refine((date) => date < new Date(), {
      message: 'La fecha debe ser anterior a hoy',
    }),
});

export type CreateReferenceSchema = z.infer<typeof createReferenceSchema>;
