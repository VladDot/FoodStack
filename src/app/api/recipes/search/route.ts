import { searchEdamamRecipes } from '@/shared/api/edamam';
import { logger } from '@/shared/lib/logger';

import { NextResponse } from 'next/server';

import axios from 'axios';
import z from 'zod';

const searchParamsSchema = z.object({
  query: z.string().trim().min(1, 'Search query cannot be empty'),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawQuery = searchParams.get('query') || '';

    const validation = searchParamsSchema.safeParse({ query: rawQuery });

    if (!validation.success) {
      const errorMessage = validation.error.issues[0].message || 'Invalid search query';

      logger.warn(
        { rawQuery, issues: validation.error.issues },
        'Validation failed for recipe search query'
      );

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const cleanedData = await searchEdamamRecipes(validation.data.query);

    return NextResponse.json(cleanedData);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const edamamErrorMessage = error.response?.data?.message || 'Edamam API error';

      logger.error(
        {
          status,
          edamamData: error.response?.data,
          url: error.config?.url,
        },
        'Axios error during Edamam request'
      );

      if (status === 429) {
        return NextResponse.json(
          {
            error: 'Rate limit exceeded. Please try again later.',
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: `Error from external recipe service: ${edamamErrorMessage}` },
        { status }
      );
    }

    if (error instanceof Error) {
      logger.error(
        { massage: error.message, stack: error.stack },
        'Unexpected error during recipe search'
      );
    } else {
      logger.error({ error }, 'Unknown error type during recipe search');
    }

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
