import z from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@/shared/lib/logger';
import { mapCharactersToCards } from '@/entities/character/model/mapper';
import { fetchCharactersFromApi } from '@/entities/character/api/fetchCharacters';
import { apiResponseSchema, queryParamsSchema } from '@/entities/character/model/scheme';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const validation = queryParamsSchema.safeParse({
      query: searchParams.get('query'),
      page: searchParams.get('page'),
    });

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid search query' }, { status: 400 });
    }

    const rawData = await fetchCharactersFromApi(validation.data);

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
    const cleanCard = mapCharactersToCards(parsedData.data.results);

    return NextResponse.json({
      data: cleanCard,
      pagination: {
        page: validation.data.page,
        totalPages: parsedData.data.info.pages,
        hasNext: parsedData.data.info.next !== null,
        hasPrev: parsedData.data.info.prev !== null,
      },
    });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error : new Error(String(error)) },
      'Unhandled error in GET /api/characters'
    );
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
