import axios from 'axios';
import { unstable_cache } from 'next/cache';

import { logger } from '@/shared/lib/logger';
import { AppError } from '@/shared/lib/error';

interface IFetchCharactersFromApi {
  page: number;
  query: string;
}

async function fetchCharactersFromApiUncached({ query, page = 1 }: IFetchCharactersFromApi) {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character', {
      params: {
        name: query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      
      if (status === 429) {
        // Rate limiting
        return { results: [], info: { pages: 0 }, rateLimited: true };
      }
      if (status && status >= 500) {
        // Server error
        logger.error({ error }, 'Rick & Morty API error');
      }
    }

    throw new AppError('Failed to fetch characters', {
      statusCode: 500,
      cause: error instanceof Error ? error : new Error(String(error)),
    });
  }
}

export const fetchCharactersFromApi = unstable_cache(
  async ({ query, page = 1 }: IFetchCharactersFromApi) =>
    fetchCharactersFromApiUncached({ query, page }),
  ['characters-api'],
  { revalidate: 5 * 60, tags: ['characters'] }
);
