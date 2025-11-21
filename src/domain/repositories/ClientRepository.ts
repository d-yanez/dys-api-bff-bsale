import { Client } from 'domain/entities/Client';

export interface ClientRepository {
  createClient(client: Client): Promise<Client>;
}
