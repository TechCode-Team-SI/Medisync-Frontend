/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const selectElementschema = z.object({
  item: z.array(z.string()).min(1, 'Ingrese la descripcion'),
});

export type SelectElementschema = z.infer<typeof selectElementschema>;
