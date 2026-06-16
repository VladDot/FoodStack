import { redirect } from 'next/navigation';

import { Pagination } from '@/shared/ui/pagination';
import { CharacterCard } from '@/shared/ui/card/Card';
import { CleanCardItem } from '@/shared/ui/card/types';
import { apiResponseSchema } from '@/entities/character/model/scheme';
import { mapCharactersToCards } from '@/entities/character/model/mapper';
import { SearchInput } from '@/features/general/ui/search/ui/SearchInput';
import { fetchCharactersFromApi } from '@/entities/character/api/fetchCharacters';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
}

export default async function CharactersPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { query = 'morty', page = '1' } = await searchParams;
  const pageNum = parseInt(page);

  if (isNaN(pageNum) || pageNum < 1) {
    redirect(`/${locale}/characters?query=${query}&page=1`);
  }

  let cards: CleanCardItem[] = [];
  let isError = false;
  let paginationInfo = {
    currentPage: pageNum,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  };

  try {
    const rawData = await fetchCharactersFromApi({ query, page: pageNum });

    const parsedData = apiResponseSchema.safeParse(rawData);

    if (parsedData.success) {
      if (pageNum > parsedData.data.info.pages && parsedData.data.info.pages > 0) {
        redirect(`/${locale}/characters?query=${query}&page=${parsedData.data.info.pages}`);
      }

      cards = mapCharactersToCards(parsedData.data.results);
      paginationInfo = {
        currentPage: pageNum,
        totalPages: parsedData.data.info.pages,
        hasNext: parsedData.data.info.next !== null,
        hasPrev: parsedData.data.info.prev !== null,
      };
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cards.map((card) => (
                <CharacterCard key={card.id} data={card} />
              ))}
              {cards.length === 0 && (
                <p className="text-zinc-500 col-span-full">No dimensions found for this query.</p>
              )}
            </div>
            {cards.length > 0 && (
              <Pagination
                {...paginationInfo}
                query={query}
                locale={locale}
                pathname="/characters"
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}
