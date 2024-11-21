/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const demoSchema = z.object({
  message: z.string().min(1),
});

export type DemoSchema = z.infer<typeof demoSchema>;
