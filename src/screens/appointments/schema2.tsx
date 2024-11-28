import { z } from 'zod';

export const formSchema = z.object({
  instructions: z.string().min(1, 'campo requerido'),
  description: z.string().min(1, 'campo requerido'),
  pathologies: z.array(
    z.object({
      name: z.string(),
      id: z.string(),
    }),
  ),
  symptoms: z.array(
    z.object({
      name: z.string(),
      id: z.string(),
    }),
  ),
  injuries: z.array(
    z.object({
      name: z.string(),
      id: z.string(),
    }),
  ),
  treatments: z.array(
    z.object({
      name: z.string(),
      id: z.string(),
    }),
  ),
});

export type FormSchema = z.infer<typeof formSchema>;
