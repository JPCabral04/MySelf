import { FastifyInstance } from "fastify";
import { taskController } from "../controllers/TaskController";

export async function taskRoutes(fastify: FastifyInstance) {
  fastify.post('/', taskController.post);
  fastify.get('/', taskController.get);
  fastify.get('/category/:categoryId', taskController.getByCategoryId);
  fastify.get('/:agendaItemId', taskController.getById);
  fastify.put('/:agendaItemId', taskController.put);
  fastify.delete('/:agendaItemId', taskController.delete);
}
