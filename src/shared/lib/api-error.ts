export type ApiErrorCode = "RATE_LIMIT" | "UNKNOWN";

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public code: ApiErrorCode = "UNKNOWN",
    ) {
        super(message);
        this.name = "ApiError";
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export function isRateLimitError(error: unknown): boolean {
    if (!error || typeof error !== "object") return false;
    const candidate = error as { status?: unknown; code?: unknown };
    return (
        candidate.code === "RATE_LIMIT" ||
        candidate.status === 429 ||
        candidate.status === 402
    );
}
