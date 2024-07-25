import { z } from 'zod';

export const demoSchema = z
  .object({
    name: z.string().min(1, 'Nombre requerido'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden',
  });

export type DemoSchema = z.infer<typeof demoSchema>;
