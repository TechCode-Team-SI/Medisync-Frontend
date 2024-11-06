/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const appointmentDetailsSchema = z.object({
  fullName: z.string().min(1, 'Ingrese el campo'),
  email: z.string().min(1, 'Ingrese el campo'),
  phone: z.string().min(1, 'Ingrese el campo'),
  age: z.string().min(1, 'Ingrese el campo'),
  specialty: z.string().min(1, 'Ingrese el campo'),
  doctor: z.string().min(1, 'Ingrese el campo'),
  time: z.string().min(1, 'Ingrese el campo'),
  status: z.string().min(1, 'Ingrese el campo'),
});

export type AppointmentDetailsSchema = z.infer<typeof appointmentDetailsSchema>;
