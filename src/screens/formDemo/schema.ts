import { z } from 'zod';

export const demoSchema = z
  .object({
    name: z.string().min(1, 'Nombre requerido'),
    lastName: z.string().min(1, 'Apellido requerido'),
    identification: z.string().min(1, 'Cedula requerido'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
    field: z.string().min(1, 'Campo requerido'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden',
  });

export type DemoSchema = z.infer<typeof demoSchema>;
