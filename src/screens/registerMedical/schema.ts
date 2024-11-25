/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const demoSchema = z.object({
  fullName: z.string().min(1, 'Nombre requerido').nullable(),
  dni: z.string().min(8, 'Cedula requerido').max(8, "Cedula Invalida").nullable(),
  email: z.string().email('Email inválido').nullable(),
  phone: z.string().min(11, 'Telefono inválido').max(11, "El teléfono no puede tener más de 11 dígitos").nullable(), 
  password: z.string().min(1, 'Contraseña requerido').nullable(),
  address: z.string().min(1, 'Dirección requerido').nullable(),
  gender: z.string().min(1, 'Campo Requerido').nullable(),
  MPPS: z.string().optional(),
  CML: z.string().optional(),
  isMedic: z.boolean(),
  birthday: z
    .date({
      required_error: 'Campo Requerido',
    })
    .refine((date) => date < new Date(), {
      message: 'La fecha debe ser anterior a hoy',
    }),
});

export type DemoSchema = z.infer<typeof demoSchema>;
