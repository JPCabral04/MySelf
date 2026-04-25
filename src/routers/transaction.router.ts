import { FastifyInstance } from "fastify";
import { transactionController } from "../controllers/TransactionController";

export async function transactionRoutes(fastify: FastifyInstance) {
  fastify.post('/', transactionController.post);
  fastify.get('/', transactionController.get);
  fastify.get('/category/:categoryId', transactionController.getByCategoryId);
  fastify.get('/:financialItemId', transactionController.getById);
  fastify.put('/:financialItemId', transactionController.put);
  fastify.delete('/:financialItemId', transactionController.delete);
}
