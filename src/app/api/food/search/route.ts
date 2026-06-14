import { searchEdamamFoods } from '@/shared/api/edamam';
import { logger } from '@/shared/lib/logger';

import { NextResponse } from 'next/server';

import axios from 'axios';
import { z } from 'zod';

const searchParamsSchema = z.object({
  query: z.string().trim().min(1, 'Search query cannot be empty'),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawQuery = searchParams.get('query') || '';

    const validation = searchParamsSchema.safeParse({ query: rawQuery });

    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || 'Invalid request';

      logger.warn(
        { rawQuery, issues: validation.error.issues },
        'Validation failed for food search query'
      );

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const cleanedData = await searchEdamamFoods(validation.data.query);

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
          { error: 'Request limit exceeded for food database. Please try again in a minute.' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: `Error from external food service: ${edamamErrorMessage}` },
        { status }
      );
    }

    if (error instanceof Error) {
      logger.error(
        { message: error.message, stack: error.stack },
        'Unexpected internal server error'
      );
    } else {
      logger.error({ error }, 'Unknown internal server error');
    }

    return NextResponse.json(
      { error: 'Internal server error during data processing' },
      { status: 500 }
    );
  }
}
