import { FastifyInstance } from "fastify";
import { financialItemController } from "../controllers/FinancialItemController";

export async function financialItemRoutes(fastify: FastifyInstance) {
  fastify.post('/', financialItemController.post);
  fastify.get('/', financialItemController.get);
  fastify.get('/user/:userId', financialItemController.getByUserId);
  fastify.get('/:id', financialItemController.getById);
  fastify.put('/:id', financialItemController.put);
  fastify.delete('/:id', financialItemController.delete);
}
