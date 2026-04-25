import { FastifyInstance } from "fastify";
import { userController } from "../controllers/UserController";


export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/', userController.post);
  fastify.get('/', userController.get);
  fastify.get('/email/:email', userController.getByEmail);
  fastify.get('/:id', userController.getById);
  fastify.put('/:id', userController.put);
  fastify.delete('/:id', userController.delete);
}