import { FastifyInstance } from "fastify";
import { userController } from "../controllers/UserController";


export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/', userController.post);
  fastify.get('/', userController.get);
  fastify.get('/:id', userController.getById);
  fastify.get('/:email', userController.getByEmail);
  fastify.put('/:id', userController.put);
  fastify.delete('/:id', userController.delete);
}