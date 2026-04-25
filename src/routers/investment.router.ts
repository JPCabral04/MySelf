import { FastifyInstance } from "fastify";
import { investmentController } from "../controllers/InvestmentController";

export async function investmentRoutes(fastify: FastifyInstance) {
  fastify.post('/', investmentController.post);
  fastify.get('/', investmentController.get);
  fastify.get('/:financialItemId', investmentController.getById);
  fastify.put('/:financialItemId', investmentController.put);
  fastify.delete('/:financialItemId', investmentController.delete);
}
