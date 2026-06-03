import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe trop court'),
});

export const propertySchema = z.object({
  slug: z.string().min(1, 'Requis'),
  status: z.enum(['a_vendre', 'a_louer', 'vendu', 'loue']),
  type: z.enum(['appartement', 'villa', 'terrain', 'bureau', 'local_commercial']),
  price: z.string().optional(),
  total_area: z.string().min(1, 'Requis'),
  typology: z.string().optional(),
  location_fr: z.string().min(1, 'Requis'),
  location_ar: z.string().optional().default(''),
  title_fr: z.string().min(1, 'Requis'),
  title_ar: z.string().optional().default(''),
  description_fr: z.string().min(1, 'Requis'),
  description_ar: z.string().optional().default(''),
  virtual_tour_url: z.string().optional(),
  is_featured: z.boolean(),
  amenities: z.array(z.string()),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type PropertyInput = z.infer<typeof propertySchema>;
