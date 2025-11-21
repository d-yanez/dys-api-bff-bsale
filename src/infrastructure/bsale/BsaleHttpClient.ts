import axios, { AxiosInstance } from 'axios';
import { env } from 'config/env';
import { logger } from 'shared/logger';

export class BsaleHttpClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: env.bsale.baseUrl,
      timeout: 8000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'access_token': env.bsale.accessToken
      }
    });
  }

  async post<T = any>(url: string, data: any): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data);
      logger.debug({ url, status: response.status }, 'BSale POST OK');
      return response.data;
    } catch (error: any) {
      logger.error(
        {
          url,
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        },
        'BSale POST error'
      );
      throw error;
    }
  }
}
