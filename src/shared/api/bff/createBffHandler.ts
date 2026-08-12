import { NextRequest, NextResponse } from "next/server";

import { logger, ApiError, ApiErrorCode } from "@/shared/lib";

type GenericHandler<T, Ctx = unknown> = (
    request: NextRequest,
    context: Ctx,
) => Promise<T>;

function toErrorCode(status: number): ApiErrorCode {
    if (status === 429) return "RATE_LIMIT";
    return "UNKNOWN";
}

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
                return NextResponse.json(
                    {
                        error: {
                            code: toErrorCode(error.status),
                            message: error.message,
                        },
                    },
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
                { error: { code: "UNKNOWN", message: "An unexpected error occurred" } },
                { status: 500 },
            );
        }
    };
}