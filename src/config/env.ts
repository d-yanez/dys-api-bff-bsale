import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiKey: process.env.API_KEY || '',
  bsale: {
    baseUrl: process.env.BSALE_BASE_URL || 'https://api.bsale.cl/v1',
    accessToken: process.env.BSALE_ACCESS_TOKEN || ''
  }
};

if (!env.apiKey) {
  console.warn('[CONFIG] API_KEY no está definido');
}

if (!env.bsale.accessToken) {
  // no lanzamos error aquí para no romper en build, pero sí avisamos
  // ya en runtime podemos validar.
  console.warn('[CONFIG] BSALE_ACCESS_TOKEN no está definido');
}
