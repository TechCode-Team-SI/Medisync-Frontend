import { z } from 'zod';

export const demoSchema = z.object({
  birthday: z.date(),
  range: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export type DemoSchema = z.infer<typeof demoSchema>;
