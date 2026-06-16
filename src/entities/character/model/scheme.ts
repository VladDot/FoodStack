import z from 'zod';

export type RickMortyCharacterSchema = z.infer<typeof rickMortyCharacterSchema>;

export const apiInfoSchema = z.object({
  count: z.number(),
  pages: z.number(),
  next: z.string().url().nullable(),
  prev: z.string().url().nullable(),
});

const rickMortyCharacterSchema = z.object({
  id: z.number(),
  type: z.string(),
  name: z.string(),
  status: z.string(),
  gender: z.string(),
  species: z.string(),
  image: z.string().url(),
});

export const queryParamsSchema = z.object({
  query: z.string().min(1).max(100).catch(''),
  page: z.coerce.number().int().positive().catch(1),
});

export const apiResponseSchema = z.object({
  info: apiInfoSchema,
  results: z.array(rickMortyCharacterSchema),
});
