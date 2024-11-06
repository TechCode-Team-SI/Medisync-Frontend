import { z } from 'zod';

export const formSchema = z.object({
  instructions: z.string().min(1, 'campo requerido'),
  description: z.string().min(1, 'campo requerido'),
  fields: z
    .array(
      z.object({
        fieldQuestionId: z.string(),
      }),
    )
    .min(1, 'Debe agregar al menos una pregunta'),
});

export type FormSchema = z.infer<typeof formSchema>;
