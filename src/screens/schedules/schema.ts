import { z } from 'zod';

export const scheduleSchema = z.object({
  name: z.string().min(1, 'Requerido'),
  from: z
    .string()
    .min(1, 'Requerido')
    .refine(
      (value) => {
        const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(value);
      },
      { message: 'formato: HH:MM' },
    ),
  to: z
    .string()
    .min(1, 'Requerido')
    .refine(
      (value) => {
        const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(value);
      },
      { message: 'formato: HH:MM' },
    ),
});

export type ScheduleSchema = z.infer<typeof scheduleSchema>;
