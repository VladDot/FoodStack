import { ApiError } from "./api-error";

export const EXTERNAL_API_TIMEOUT_MS = 15_000;

export async function fetchWithTimeout(
    url: string | URL,
    init?: RequestInit,
    timeoutMs: number = EXTERNAL_API_TIMEOUT_MS,
): Promise<Response> {
    try {
        return await fetch(url, {
            ...init,
            signal: AbortSignal.timeout(timeoutMs),
        });
    } catch (error) {
        if ((error as DOMException)?.name === "TimeoutError") {
            throw new ApiError(
                504,
                `External request timed out after ${timeoutMs}ms`,
            );
        }
        throw error;
    }
}