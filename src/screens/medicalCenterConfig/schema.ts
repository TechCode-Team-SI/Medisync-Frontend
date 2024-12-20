/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const centerConfigSchema = z.object({
  name: z.string().min(1, 'Campo Requerido'),
  address: z.string().min(1, 'Campo Requerido'),
  description: z.string().min(1, 'Campo Requerido'),
  state: z.string().min(1, 'Campo Requerido'),
  municipality: z.string().min(1, 'Campo Requerido'),
  parish: z.string().min(1, 'Campo Requerido'),
  localPhone: z.string().min(1, 'Campo Requerido'),
  mobilePhone: z.string().min(1, 'Campo Requerido'),
  email: z.string().min(1, 'Campo Requerido').email(),
  instagramName: z.string(),
  twitterName: z.string(),
  facebookName: z.string(),
  tiktokName: z.string(),
  mission: z.string().min(1, 'Campo Requerido'),
  vision: z.string().min(1, 'Campo Requerido'),
});

export type centerConfigSchema = z.infer<typeof centerConfigSchema>;
