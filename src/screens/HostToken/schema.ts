/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const demoSchema = z
  .object({
    host: z.string().min(1, 'Nombre requerido'),
    email: z.string().email('Email inválido'),
    token: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
  })
  .refine((data) => data.token === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden',
  });

export type DemoSchema = z.infer<typeof demoSchema>;
