import { z } from 'zod';

import { GenderEnum } from 'src/utils/constants';

export const createAppointmentSchema = z.object({
  patientFullName: z.string({ required_error: 'nombre requerido' }),
  patientAddress: z.string({ required_error: 'nombre requerido' }),
  patientGender: z.nativeEnum(GenderEnum, { required_error: 'genero requerido' }),
  patientDNI: z.string({ required_error: 'cedula requerida' }),
  patientBirthday: z.date({ required_error: 'fecha de nacimiento requerida' }),
  appointmentHour: z.string({ required_error: 'hora de cita requerida' }).min(1, 'Ingrese la hora de la cita'),
  appointmentDate: z.date({ required_error: 'Fecha de cita requerida' }),
  referredContent: z.string().optional(),
  requestValues: z.array(
    z
      .object({
        fieldQuestion: z.object({
          id: z.string().min(1),
        }),
        value: z.string().min(1, 'campo requerido'),
      })
      .or(
        z.object({
          fieldQuestion: z.object({
            id: z.string().min(1),
          }),
          selections: z
            .array(
              z.object({
                id: z.string().min(1),
              }),
            )
            .min(1, 'seleccion requerida'),
        }),
      ),
  ),
});

export type CreateAppointmentSchema = z.infer<typeof createAppointmentSchema>;
