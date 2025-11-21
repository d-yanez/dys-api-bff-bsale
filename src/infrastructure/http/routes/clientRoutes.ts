import { Router } from 'express';
import { ClientController } from 'interfaces/http/controllers/ClientController';
import { CreateClientUseCase } from 'application/use-cases/CreateClientUseCase';
import { BsaleClientRepository } from 'infrastructure/bsale/BsaleClientRepository';
import { BsaleHttpClient } from 'infrastructure/bsale/BsaleHttpClient';

const router = Router();

// Wiring manual (luego lo podemos refactorizar con un pequeño contenedor DI)
const bsaleHttpClient = new BsaleHttpClient();
const clientRepository = new BsaleClientRepository(bsaleHttpClient);
const createClientUseCase = new CreateClientUseCase(clientRepository);
const clientController = new ClientController(createClientUseCase);

// POST /api/clients
router.post('/clients', clientController.createClient);

export { router as clientRoutes };
