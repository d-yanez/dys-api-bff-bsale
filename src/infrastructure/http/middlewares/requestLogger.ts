import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { logger } from 'shared/logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const requestId = randomUUID();
  (req as any).requestId = requestId;

  logger.info(
    { requestId, method: req.method, url: req.originalUrl },
    'Incoming request'
  );

  res.on('finish', () => {
    logger.info(
      {
        requestId,
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode
      },
      'Request completed'
    );
  });

  next();
}
