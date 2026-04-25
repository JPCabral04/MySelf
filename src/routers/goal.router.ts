import { FastifyInstance } from "fastify";
import { goalController } from "../controllers/GoalController";

export async function goalRoutes(fastify: FastifyInstance) {
  fastify.post('/', goalController.post);
  fastify.get('/', goalController.get);
  fastify.get('/:financialItemId', goalController.getById);
  fastify.put('/:financialItemId', goalController.put);
  fastify.delete('/:financialItemId', goalController.delete);
}
