/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const demoSchema = z.object({
  fullName: z.string().min(1, 'Nombre requerido').nullable(),
  dni: z.string().min(1, 'Cedula requerido').nullable(),
  email: z.string().email('Email inválido').nullable(),
  phone: z.string().min(1, 'Telefono inválido').nullable(),
  password: z.string().min(1, 'Contraseña requerido').nullable(),
  address: z.string().min(1, 'Dirección requerido').nullable(),
  gender: z.string().min(1, 'Campo Requerido').nullable(),
  MPPS: z.string().min(1, 'Campo Requerido').nullable(),
  CML: z.string().min(1, 'Campo Requerido').nullable(),
  birthday: z
    .date({
      required_error: 'Campo Requerido',
    })
    .refine((date) => date < new Date(), {
      message: 'La fecha debe ser anterior a hoy',
    }),
});

export type DemoSchema = z.infer<typeof demoSchema>;
