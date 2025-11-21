import { Request, Response, NextFunction } from 'express';
import { logger } from 'shared/logger';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const requestId = (req as any).requestId;

  logger.error(
    {
      requestId,
      message: err.message,
      stack: err.stack
    },
    'Unhandled error'
  );

  const status = err.status || 500;
  res.status(status).json({
    error: true,
    message: err.message || 'Internal server error',
    requestId
  });
}
