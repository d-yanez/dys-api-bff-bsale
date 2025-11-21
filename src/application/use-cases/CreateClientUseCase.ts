import { Client } from 'domain/entities/Client';
import { ClientRepository } from 'domain/repositories/ClientRepository';
import { CreateClientDto } from 'application/dtos/CreateClientDto';

export class CreateClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(dto: CreateClientDto): Promise<Client> {
    // Aquí puedes meter validaciones de negocio simples
    if (!dto.rut || !dto.nombre || !dto.apellido) {
      throw new Error('rut, nombre y apellido son obligatorios');
    }

    const client: Client = {
      rut: dto.rut,
      firstName: dto.nombre,
      lastName: dto.apellido
    };

    return this.clientRepository.createClient(client);
  }
}
