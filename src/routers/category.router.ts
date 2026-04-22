import { FastifyInstance } from "fastify";
import { categoryController } from "../controllers/CategoryController";

export async function categoryRoutes(fastify: FastifyInstance) {
  fastify.post('/', categoryController.post);
  fastify.get('/', categoryController.get);
  fastify.get('/user/:userId', categoryController.getByUserId);
  fastify.get('/:id', categoryController.getById);
  fastify.put('/:id', categoryController.put);
  fastify.delete('/:id', categoryController.delete);
}