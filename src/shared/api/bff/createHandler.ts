import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

import { logger } from "@/shared/lib/logger";

type SearchHandler = (query: string) => Promise<unknown>;

const searchParamsSchema = z.object({
    query: z.string().trim().min(1, "Search query cannot be empty"),
});

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

export function createBffHandler(handler: SearchHandler) {
    return async function GET(request: NextRequest) {
        try {
            const { searchParams } = request.nextUrl;
            const rawQuery = searchParams.get("query") || "";

            const validation = searchParamsSchema.safeParse({
                query: rawQuery,
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

            const data = await handler(validation.data.query);

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
                logger.error({ message: error.message }, "Unexpected error");
            }

            return NextResponse.json(
                { error: "An unexpected error occurred" },
                { status: 500 },
            );
        }
    };
}
