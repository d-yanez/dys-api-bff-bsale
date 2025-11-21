import pino from 'pino';
import { env } from 'config/env';

export const logger = pino({
  level: env.nodeEnv === 'production' ? 'info' : 'debug',
  base: undefined, // evita meter pid/hostname si no quieres
  timestamp: pino.stdTimeFunctions.isoTime
});
