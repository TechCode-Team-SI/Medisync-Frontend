import { z } from 'zod';

export const createReferenceSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  email: z.string(),
  age: z.string(),
  phone: z.string(),
  bloodType: z.string(),
  specialty: z.string().min(1, 'Especialidad requerida'),
  time: z.string(),
  observations: z.string(),
  birthdate: z.string(),
  gender: z.string(),
  doctor: z.string().min(1, 'Médico requerido'),
  date: z.string(),
  pathologies: z.string().min(1, 'Patologias requeridas'),
  symptoms: z.string().min(1, 'Sintomas requeridos'),
  injuries: z.string().min(1, 'Lesiones requeridas'),
});

export type CreateReferenceSchema = z.infer<typeof createReferenceSchema>;
