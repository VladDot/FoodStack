import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

import { logger, ApiError } from "@/shared/lib";

type SearchHandler<T> = (params: {
    query: string;
    cursor?: string;
}) => Promise<T>;

const searchParamsSchema = z.object({
    query: z.string().trim().min(1, "Search query cannot be empty"),
    cursor: z.string().optional(),
});

export function createBffHandler<T>(handler: SearchHandler<T>) {
    return async function GET(request: NextRequest) {
        try {
            const { searchParams } = request.nextUrl;
            const rawQuery = searchParams.get("query") || "";
            const rawCursor = searchParams.get("cursor") || undefined;

            const validation = searchParamsSchema.safeParse({
                query: rawQuery,
                cursor: rawCursor,
            });

            if (!validation.success) {
                const errorMessage =
                    validation.error.issues[0]?.message || "Invalid request";

                logger.warn(
                    { rawQuery, issues: validation.error.issues },
                    "Validation failed for search query",
                );

                return NextResponse.json(
                    { error: errorMessage },
                    { status: 400 },
                );
            }

            const data: T = await handler({
                query: validation.data.query,
                cursor: validation.data.cursor,
            });

            return NextResponse.json(data);
        } catch (error: unknown) {
            if (error instanceof ApiError) {
                if (error.status === 429) {
                    return NextResponse.json(
                        { error: "Request limit exceeded" },
                        { status: 429 },
                    );
                }
                return NextResponse.json(
                    { error: error.message },
                    { status: error.status },
                );
            }

            if (error instanceof Error) {
                logger.error(
                    { message: error.message, stack: error.stack },
                    "Unexpected error occurred",
                );
            } else {
                logger.error({ error }, "Unknown error type occurred");
            }

            return NextResponse.json(
                { error: "An unexpected error occurred" },
                { status: 500 },
            );
        }
    };
}
