import { z } from "zod";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import { logger } from "@/shared/lib/logger";

const searchParamsSchema = z.object({
    query: z.string().trim().min(1, "Search query cannot be empty"),
});

type SearchHandler = (query: string) => Promise<unknown>;

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
            if (axios.isAxiosError(error)) {
                const status = error.response?.status || 500;
                const edamamErrorMessage =
                    error.response?.data?.message || "Edamam API error";

                logger.error(
                    {
                        status,
                        edamamData: error.response?.data,
                        url: error.config?.url,
                    },
                    "Axios error during Edamam request",
                );

                if (status === 429) {
                    return NextResponse.json(
                        {
                            error:
                                "Request limit exceeded. Please try again later.",
                        },
                        { status: 429 },
                    );
                }

                return NextResponse.json(
                    {
                        error: `Error from external service: ${edamamErrorMessage}`,
                    },
                    { status },
                );
            }

            if (error instanceof Error) {
                logger.error(
                    { message: error.message, stack: error.stack },
                    "Unexpected error during search",
                );
            } else {
                logger.error({ error }, "Unknown error type during search");
            }

            return NextResponse.json(
                { error: "An unexpected error occurred" },
                { status: 500 },
            );
        }
    };
}
