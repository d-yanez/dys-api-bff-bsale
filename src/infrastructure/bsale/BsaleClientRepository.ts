import { ClientRepository } from 'domain/repositories/ClientRepository';
import { Client } from 'domain/entities/Client';
import { BsaleHttpClient } from './BsaleHttpClient';

interface BsaleClientResponse {
  id: number;
  firstName: string;
  lastName: string;
  code: string;
  // otros campos que devuelve Bsale…
}

export class BsaleClientRepository implements ClientRepository {
  constructor(private readonly httpClient: BsaleHttpClient) {}

  async createClient(client: Client): Promise<Client> {
    const payload = {
      firstName: client.firstName,
      lastName: client.lastName,
      code: client.rut
    };

    const data = await this.httpClient.post<BsaleClientResponse>('/clients.json', payload);

    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      rut: data.code
    };
  }
}
