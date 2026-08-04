import { NextRequest, NextResponse } from "next/server";

import { logger, ApiError } from "@/shared/lib";

type GenericHandler<T, Ctx = unknown> = (
    request: NextRequest,
    context: Ctx,
) => Promise<T>;

export function createBffHandler<T, Ctx = unknown>(
    handler: GenericHandler<T, Ctx>,
) {
    return async function GET(
        request: NextRequest,
        context: Ctx,
    ): Promise<NextResponse> {
        try {
            const data: T = await handler(request, context);
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
