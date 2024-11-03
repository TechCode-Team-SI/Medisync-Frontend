import { z } from 'zod';

import { FieldQuestionTypeEnum } from 'src/utils/constants';

export const questionSchema = z
  .object({
    name: z.string().min(1, 'Ingrese el nombre'),
    label: z.string().min(1, 'Ingrese el label'),
    description: z.string().optional(),
    isRequired: z.boolean(),
    type: z.nativeEnum(FieldQuestionTypeEnum, { required_error: 'Seleccione un tipo de pregunta' }),
    selectionConfig: z
      .object({
        isMultiple: z.boolean(),
      })
      .optional()
      .nullable(),
    selections: z
      .array(
        z.object({
          value: z.string(),
        }),
      )
      .optional()
      .nullable(),
  })
  .refine(
    (data) => {
      if (data.type !== FieldQuestionTypeEnum.SELECTION) return true;
      if (!data.selections) return false;
      if (data.selections.length <= 1) return false;
      return true;
    },
    { message: 'Cree al menos dos opciones', path: ['selections'] },
  );

export type QuestionSchema = z.infer<typeof questionSchema>;
