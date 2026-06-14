import z from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@/shared/lib/logger';
import { mapCharactersToCards } from '@/entities/character/model/mapper';
import { rickMortyCharacterSchema } from '@/entities/character/model/scheme';
import { fetchCharactersFromApi } from '@/entities/character/api/fetchCharacters';

const queryParamsSchema = z.object({
  query: z.string().catch(''),
});

const apiResponseSchema = z.object({
  result: z.array(rickMortyCharacterSchema),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const validation = queryParamsSchema.safeParse({
      query: searchParams.get('query'),
    });
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid search query' }, { status: 400 });
    }

    const rawData = await fetchCharactersFromApi(validation.data.query);

    const parsedData = apiResponseSchema.safeParse(rawData);

    if (!parsedData.success) {
      logger.error(
        {
          zodIssues: parsedData.error.issues,
        },
        'Zod Validation Failed'
      );
      return NextResponse.json({ error: 'Invalid data structure from upstream' }, { status: 502 });
    }
    const cleanCard = mapCharactersToCards(parsedData.data.result);

    return NextResponse.json(cleanCard);
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error : new Error(String(error)) },
      'Unhandled error in GET /api/characters'
    );
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
