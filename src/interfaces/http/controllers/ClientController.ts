import { Request, Response, NextFunction } from 'express';
import { CreateClientUseCase } from 'application/use-cases/CreateClientUseCase';

export class ClientController {
  constructor(private readonly createClientUseCase: CreateClientUseCase) {}

  createClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { rut, nombre, apellido } = req.body;

      // Validación simple de input (luego podemos mejorar)
      if (!rut || !nombre || !apellido) {
        return res.status(400).json({
          error: true,
          message: 'rut, nombre y apellido son obligatorios'
        });
      }

      const client = await this.createClientUseCase.execute({ rut, nombre, apellido });

      return res.status(201).json({
        success: true,
        data: client
      });
    } catch (err) {
      next(err);
    }
  };
}
