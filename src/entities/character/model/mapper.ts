import { CleanCardItem } from '@/shared/ui/card/types';

import { RickMortyCharacterSchema } from './scheme';

export function mapCharactersToCards(rawCharacters: RickMortyCharacterSchema[]): CleanCardItem[] {
  return rawCharacters.map((char) => {
    return {
      id: char.id.toString(),
      title: char.name,
      badge: char.status,
      imageUrl: char.image,
      description: char.species,
    };
  });
}
