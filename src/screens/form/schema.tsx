import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, 'titulo de formulario requerido'),
  description: z.string().optional(),
  fields: z
    .array(
      z.object({
        fieldQuestionId: z.string(),
      }),
    )
    .min(1, 'Debe agregar al menos una pregunta'),
});

export type FormSchema = z.infer<typeof formSchema>;
