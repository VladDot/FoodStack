import z from 'zod';

export type RickMortyRawCharacter = z.infer<typeof rickMortyCharacterSchema>;

export const rickMortyCharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  type: z.string(),
  gender: z.string(),
  image: z.string().url(),
});
