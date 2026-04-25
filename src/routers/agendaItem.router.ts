import { FastifyInstance } from "fastify";
import { agendaItemController } from "../controllers/AgendaItemController";

export async function agendaItemRoutes(fastify: FastifyInstance) {
  fastify.post('/', agendaItemController.post);
  fastify.get('/', agendaItemController.get);
  fastify.get('/user/:userId', agendaItemController.getByUserId);
  fastify.get('/:id', agendaItemController.getById);
  fastify.put('/:id', agendaItemController.put);
  fastify.delete('/:id', agendaItemController.delete);
}
