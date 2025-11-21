import { Request, Response, NextFunction } from 'express';
import { env } from 'config/env';
import { logger } from 'shared/logger';

export function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.header('x-api-key');

  if (!env.apiKey) {
    logger.error('API_KEY no configurada en variables de entorno');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  if (!apiKey || apiKey !== env.apiKey) {
    logger.warn({ ip: req.ip }, 'Intento de acceso con API Key inválida');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}
