import { z } from 'zod';

import { CharacterCard } from '@/shared/ui/card/Card';
import { CleanCardItem } from '@/shared/ui/card/types';
import { mapCharactersToCards } from '@/entities/character/model/mapper';
import { SearchInput } from '@/features/general/ui/search/ui/SearchInput';
import { rickMortyCharacterSchema } from '@/entities/character/model/scheme';
import { fetchCharactersFromApi } from '@/entities/character/api/fetchCharacters';

interface PageProps {
  searchParams: Promise<{
    query?: string;
}>;
}

const apiResponseSchema = z.object({
  results: z.array(rickMortyCharacterSchema),
});

export default async function CharactersPage({ searchParams }: PageProps) {
  const { query = 'morty' } = await searchParams;

  let cards: CleanCardItem[] = [];
  let isError = false;

  try {
    const rawData = await fetchCharactersFromApi(query);

    const parsedData = apiResponseSchema.safeParse(rawData);

    if (parsedData.success) {
      cards = mapCharactersToCards(parsedData.data.results);
    } else {
      isError = true;
    }
  } catch (error) {
    isError = true;
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-black tracking-tight bg-liner-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Rick & Morty Portal (Pure SSR Version)
          </h1>
          <SearchInput />
        </div>

        {isError && <div className="text-rose-400">Something went wrong while fetching data.</div>}

        {!isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cards.map((card) => (
              <CharacterCard key={card.id} data={card} />
            ))}
            {cards.length === 0 && (
              <p className="text-zinc-500 col-span-full">No dimensions found for this query.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
