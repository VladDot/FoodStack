export class AppError extends Error {
  public readonly statusCode: number;
  public readonly cause?: Error;

  constructor(
    message: string,
    options?: {
      statusCode?: number;
      cause?: Error;
    }
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = options?.statusCode || 500;
    this.cause = options?.cause;

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}
