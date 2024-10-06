/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const demoSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),
  lastName: z.string().min(1, 'Apellido requerido'),
  identification: z.string().min(1, 'Cedula requerido'),
  email: z.string().email('Email inválido'),
  field: z.string().min(1, 'Campo requerido'),
  birthday: z
    .date({
      required_error: 'Campo Requerido',
    })
    .refine((date) => date < new Date(), {
      message: 'La fecha debe ser anterior a hoy',
    }),
});

export type DemoSchema = z.infer<typeof demoSchema>;
