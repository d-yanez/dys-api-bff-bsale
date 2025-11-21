import express from 'express';
import { env } from 'config/env';
import { logger } from 'shared/logger';
import { requestLogger } from './middlewares/requestLogger';
import { apiKeyAuth } from './middlewares/apiKeyAuth';
import { errorHandler } from './middlewares/errorHandler';
import { clientRoutes } from './routes/clientRoutes';

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(apiKeyAuth);

// Healthcheck
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'dys-api-bff-bsale' });
});

// Rutas BFF
app.use('/api', clientRoutes);

// Error handler global
app.use(errorHandler);

app.listen(env.port, () => {
  logger.info(
    { port: env.port, env: env.nodeEnv },
    'dys-api-bff-bsale listening'
  );
});
